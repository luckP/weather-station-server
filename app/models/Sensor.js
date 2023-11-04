const mongoose = require('mongoose');
const sensorType = require('./SensorTypes');
const unityOfMeasure = require('./UnitsOfMeasure');

const sensorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sensorType: {
        type: String,
        enum: Object.values(sensorType),
        required: true,
    },
    unityOfMeasure: {
        type: String,
        enum: Object.values(unityOfMeasure),
        required: true,
    },
    location: {
        type: String,
        required: true,
        default: '-',
    },
    geolocation: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: {
            type: [Number],
        },
  },
});

sensorSchema.index({ geolocation: '2dsphere' }); // Create a geospatial index
module.exports =  mongoose.model('Sensor', sensorSchema);