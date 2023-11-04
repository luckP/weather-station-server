const express = require('express');
const router = express.Router();
const SensorReading = require('../models/SensorReading');

router.get('/', async (req, res) => {
    try {
        const sensorReadings = await SensorReading.find();
        res.json(sensorReadings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getSensorReading, (req, res) => {
    res.json(res.sensorReading);
});

router.post('/', async (req, res) => {
    const sensorReading = new SensorReading({
        sensor: req.body.sensorId,
        value: req.body.value,
        timestamp: req.body.timestamp,
    });
    try {
        const newSensorReading = await sensorReading.save();
        res.status(201).json(newSensorReading);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', getSensorReading, async (req, res) => {
    if (req.body.sensorId != null) {
        res.sensorReading.sensorId = req.body.sensorId;
    }
    if (req.body.value != null) {
        res.sensorReading.value = req.body.value;
    }
    if (req.body.timestamp != null) {
        res.sensorReading.timestamp = req.body.timestamp;
    }
    try {
        const updatedSensorReading = await res.sensorReading.save();
        res.json(updatedSensorReading);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getSensorReading, async (req, res) => {
    try {
        await res.sensorReading.remove();
        res.json({ message: 'Deleted SensorReading' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * Middleware function to get sensorReading object by ID
 */
async function getSensorReading(req, res, next) {
    try {
        sensorReading = await SensorReading.findById(req.params.id);
        if (sensorReading == null) {
            return res.status(404).json({ message: 'Cannot find sensorReading' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.sensorReading = sensorReading;
    next();
}


module.exports = router;
