import { describe, expect, test } from '@jest/globals';
import { airQualityCitiesService, getParisAirQualityTimestamp } from '../components/cityairquality/cityAirQuality.service';
import config from 'config';

describe('Air Quality Cities API Test Cases', () => {
    const validCoordinates = {
        latitude: '48.856613',  
        longitude: '2.352222', 
    };

    test('Test Case 1: Should Return 200 with Valid Coordinates', async () => {
        const { statusCode, data } = await airQualityCitiesService(validCoordinates.latitude, validCoordinates.longitude);
        expect(statusCode).toBe(200);
        expect(data.data.city).toBe("Paris");
    });

    test('Test Case 2: Should Return 400 with Missing Longitude', async () => {
        const { statusCode, message } = await airQualityCitiesService(validCoordinates.latitude, '');
        expect(statusCode).toBe(400);
        expect(message).toBe("Please provide correct lon & lat format");
    });

    test('Test Case 3: Should Return 400 with Invalid Latitude', async () => {
        const { statusCode, message } = await airQualityCitiesService('20.86962222212121', validCoordinates.longitude);
        expect(statusCode).toBe(400);
        expect(message).toBe("Please provide correct lon & lat format");
    });
});