// import { describe, expect, test } from '@jest/globals';
// import { airQualityCitiesService, getParisAirQualityTimestamp } from '../components/air/airQuality.service';
// import config from 'config';

// describe('Air Quality Cities API Test Cases', () => {
//     const validCoordinates = {
//         latitude: 48.856613,
//         longitude: 2.352222,
//     };

//     test('Test Case 1: Should Return 200 with Valid Coordinates', async () => {
//         const { statusCode, data } = await airQualityCitiesService(validCoordinates.latitude, validCoordinates.longitude);
//         expect(statusCode).toBe(200);
//         expect(data.data.city).toBe("Paris");
//     });

//     test('Test Case 2: Should Return 400 with Missing Longitude', async () => {
//         const { statusCode, message } = await airQualityCitiesService(config.get('CityData.latitude'), undefined);
//         expect(statusCode).toBe(400);
//         expect(message).toBe("Please provide correct lon & lat format");
//     });

//     test('Test Case 3: Should Return 400 with Invalid Latitude', async () => {
//         const { statusCode, message } = await airQualityCitiesService('20,86962222212121', config.get('CityData.longitude'));
//         expect(statusCode).toBe(400);
//         expect(message).toBe("Please provide correct lon & lat format");
//     });
// });

// // describe('Paris Air Quality API Test Cases', () => {
// //     // test('Test Case 1: Should Return 200 with Valid Data', async () => {
// //     //     const { statusCode, timestamp } = await getParisAirQualityTimestamp();
// //     //     expect(statusCode).toBe(200);
// //     //     expect(timestamp).toBeDefined();
// //     // });

// //     test('Test Case 2: Should Return 404 for No Data', async () => {
// //         const { statusCode, message } = await getParisAirQualityTimestamp('0.0', '0.0');
// //         expect(statusCode).toBe(404);
// //         expect(message).toBe("Content doesn't exist");
// //     });
// // });



import { describe, expect, test } from '@jest/globals';
import { airQualityCitiesService, getParisAirQualityTimestamp } from '../components/air/airQuality.service';
import config from 'config';

describe('Air Quality Cities API Test Cases', () => {
    const validCoordinates = {
        latitude: '48.856613', // Ensure it's a string
        longitude: '2.352222', // Ensure it's a string
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