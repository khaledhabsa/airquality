import schedule from 'node-schedule';
import { airQualityCitiesService } from '../components/cityairquality/cityAirQuality.service';
import MostPollutedRecord from '../models/mostPollutedRecord.model';
import AirQuality from '../models/cityAirQuality.model';
import config from 'config';

// Constants
const CRON_SCHEDULE = '0 * * * * *'; // Every minute

const latitude = config.get<string>('CityData.latitude'); // Ensure it's a string
const longitude = config.get<string>('CityData.longitude'); // Ensure it's a string

if (!latitude || !longitude) {
    throw new Error('Latitude and Longitude are required in the configuration.');
}

const log = (message: string) => {
    console.log(new Date().toISOString(), message);
};

const updateAirQualityData = async () => {
    try {
        log('Fetching air quality data...');
        const { statusCode, data } = await airQualityCitiesService(latitude, longitude);
        const res = data.data;
        if (statusCode === 200) {
            // Calculate pollution level based on AQI values
            const pollutionLevel = res.current.pollution.aqius / res.current.pollution.aqicn;

            // Store the air quality data
            const newAirQuality = new AirQuality(res);
            await newAirQuality.save();

            // Update or create the most polluted record
            const mostPollutedParisRecord = await MostPollutedRecord.findOne({ city: 'Paris' });

            if (!mostPollutedParisRecord || pollutionLevel > mostPollutedParisRecord.pollutionLevel) {
                const updatedMostPollutedParisRecord = {
                    city: 'Paris',
                    pollutionLevel,
                };

                if (mostPollutedParisRecord) {
                    // Update the existing record and set the "datetime" field
                    mostPollutedParisRecord.pollutionLevel = pollutionLevel;
                    mostPollutedParisRecord.save();
                } else {
                    // Create a new record and let the "timestamps" option handle "createdAt"
                    await MostPollutedRecord.create(updatedMostPollutedParisRecord);
                }
            }
        } else {
            log(`Failed to fetch data. Status code: ${statusCode}`);
        }
    } catch (error) {
        if (error instanceof Error) {
            log(`Error: ${error.message}`);
        } else {
            log('Error: Unknown error');
        }
    }
};

export default () => {
    schedule.scheduleJob(CRON_SCHEDULE, async () => {
        await updateAirQualityData();
    });
};
