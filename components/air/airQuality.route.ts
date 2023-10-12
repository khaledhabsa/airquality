import { Router } from "express";
import { airQualityCities ,parisAirQuality, mostPollutedDatetime } from "./airQuality.controller";
const router = Router();

router.get('/cities',airQualityCities);
router.get('/timestamp',parisAirQuality);
router.get('/mostPollutedDatetime',mostPollutedDatetime);

export default router