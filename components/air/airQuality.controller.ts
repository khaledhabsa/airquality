import { Response, Request } from 'express';
import { airQualityCitiesService, getParisAirQualityTimestamp } from './airQuality.service';
import MostPollutedRecord from '../../models/mostPollutedRecord.model';

// Define the LonLat type
type LonLat = {
    longitude: string;
    latitude: string;
};

// Define a common error response function
const sendErrorResponse = (res: Response, statusCode: number, message: string) => {
    return res.status(statusCode).json({ message });
};

// Define a common success response function
const sendSuccessResponse = (res: Response, statusCode: number, data: any) => {
    return res.status(statusCode).json({ status: 'success', data });
};

/**
 * Get air quality data for cities based on latitude and longitude.
 * @param {Request} req - Express Request object with latitude and longitude in query parameters.
 * @param {Response} res - Express Response object.
 * @returns {Response} JSON response with air quality data or error messages.
 */
const airQualityCities = async (req: Request, res: Response) => {
    try {
        const { longitude, latitude } = req.query as LonLat;

        if (!longitude || !latitude) {
            return sendErrorResponse(res, 400, 'Longitude and latitude are required in the query parameters.');
        }

        const { statusCode, ...resObj } = await airQualityCitiesService(latitude, longitude);

        if (statusCode === 200) {
            return sendSuccessResponse(res, statusCode, resObj.data.data);
        } else {
            return sendErrorResponse(res, statusCode, 'Failed to retrieve air quality data.');
        }
    } catch (error) {
        console.error('An error occurred while processing the request:', error);
        return sendErrorResponse(res, 500, 'An unexpected error occurred.');
    }
};

/**
 * Retrieves the timestamp of Paris air quality data.
 *
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Response} JSON response with the timestamp or error messages.
 */
const parisAirQuality = async (req: Request, res: Response) => {
    try {
        const { statusCode, ...resObj } = await getParisAirQualityTimestamp();

        if (statusCode === 200) {
            return sendSuccessResponse(res, statusCode, resObj);
        } else {
            return sendErrorResponse(res, statusCode, 'Failed to retrieve Paris air quality timestamp.');
        }
    } catch (error) {
        console.error('An error occurred while processing the request:', error);
        return sendErrorResponse(res, 500, 'An unexpected error occurred.');
    }
};

/**
 * Get the most polluted datetime.
 *
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @returns {Response} JSON response with the timestamp or error messages.
 */
const mostPollutedDatetime = async (req: Request, res: Response) => {
    try {
        const mostPollutedParisRecord = await MostPollutedRecord.findOne({ city: 'Paris' })
            .sort({ pollutionLevel: -1 })
            .limit(1);

        if (mostPollutedParisRecord) {
            const mostPollutedDatetime = mostPollutedParisRecord.createdAt;
            const formattedPollutionLevel = mostPollutedParisRecord.pollutionLevel.toFixed(2);

            return sendSuccessResponse(res, 200, { datetime: mostPollutedDatetime, pollutionLevel: formattedPollutionLevel });
        } else {
            return sendErrorResponse(res, 404, 'No data available');
        }
    } catch (error) {
        return sendErrorResponse(res, 500, 'Error getting most polluted datetime');
    }
};

export { airQualityCities, parisAirQuality, mostPollutedDatetime };
