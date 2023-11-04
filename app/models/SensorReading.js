const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
    sensor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sensor',
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    value: {
        type: Number,
        required: true,
    },
});


module.exports = mongoose.model('SensorReading', sensorReadingSchema);