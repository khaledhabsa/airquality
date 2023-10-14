import axios from 'axios';
import config from 'config';
import AirQuality from '../../models/cityAirQuality.model';

// Ensure environment variables are loaded from a .env file
require('dotenv').config();

// Explicitly specify the types of environment variables as strings
const apiKey: string = process.env.IQ_API_KEY || '';
const URL: string = process.env.AirVisual_URL || '';

const lonLatRegex = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/;

/**
 * @airQualityCitiesService air quality service for a city using latitude and longitude.
 * @param {string} latitude 
 * @param {string} longitude 
 * @returns {object}
 *          - statusCode {400|200|500}
 *          - message?   {string}
 *          - data?       {object}
 */
const airQualityCitiesService = async (latitude: string, longitude: string) => {
    try {
        if (!lonLatRegex.test(latitude) || !lonLatRegex.test(longitude)) {
            return {
                statusCode: 400,
                message: "Please provide correct lon & lat format"
            };
        }

        const response = await axios.get(URL, {
            params: {
                lat: latitude,
                lon: longitude,
                key: apiKey,
            }
        });

        return {
            statusCode: 200,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                statusCode: 400,
                message: error.message,
            };
        } else {
            return {
                statusCode: 500,
                message: 'An unexpected error occurred',
            };
        }
    }
};

/**
 * @getParisAirQualityTimestamp Get the last timestamp of Paris air quality data.
 * @returns {Object}
 *          - statusCode {200|404}
 *          - timestamp? {Date}
 *          - message {String}
 */
const getParisAirQualityTimestamp = async () => {
    try {
        const airQuality = await AirQuality.findOne({ city: config.get('CityData.name') })
            .lean()
            .select('updatedAt');

        if (!airQuality) {
            return {
                statusCode: 404,
                message: "Content doesn't exist"
            };
        }

        return {
            statusCode: 200,
            timestamp: airQuality.updatedAt
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: 'An unexpected error occurred'
        };
    }
};

export { airQualityCitiesService, getParisAirQualityTimestamp };
