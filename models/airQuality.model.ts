// models/airQuality.model.js
import mongoose from 'mongoose';

const airQualitySchema = new mongoose.Schema({
    city: String,
    state: String,
    country: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        },
    },
    current: {
        pollution: {
            ts: String,
            aqius: Number,
            mainus: String,
            aqicn: Number,
            maincn: String,
        },
        weather: {
            ts: String,
            tp: Number,
            pr: Number,
            hu: Number,
            ws: Number,
            wd: Number,
            ic: String,
        },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

airQualitySchema.index({ location: '2dsphere' }); // geospatial index for the 'location' field.

const AirQuality = mongoose.model('AirQuality', airQualitySchema);

export default AirQuality;
