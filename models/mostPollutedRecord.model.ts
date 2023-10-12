//models/mostPollutedRecord.mode.ts
const mongoose = require('mongoose');

const mostPollutedRecordSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    pollutionLevel: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MostPollutedRecord = mongoose.model('MostPollutedRecord', mostPollutedRecordSchema);

export default MostPollutedRecord;
