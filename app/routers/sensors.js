const express = require('express');
const router = express.Router();
const Sensor = require('../models/Sensor');

router.get('/', async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.json(sensors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getSensor, (req, res) => {
    res.json(res.sensor);
});

router.post('/', async (req, res) => {
    const sensor = new Sensor({
        id: req.body.id,
        name: req.body.name,
        sensorType: req.body.sensorType,
        unityOfMeasure: req.body.unityOfMeasure,
        location: req.body.location,
        geolocation: req.body.geolocation,
    });
    try {
        const newSensor = await sensor.save();
        res.status(201).json(newSensor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', getSensor, async (req, res) => {
    if (req.body.name != null) {
        res.sensor.name = req.body.name;
    }
    if (req.body.sensorType != null) {
        res.sensor.sensorType = req.body.sensorType;
    }
    if (req.body.unityOfMeasure != null) {
        res.sensor.unityOfMeasure = req.body.unityOfMeasure;
    }
    if (req.body.location != null) {
        res.sensor.location = req.body.location;
    }
    if (req.body.geolocation != null) {
        res.sensor.geolocation = req.body.geolocation;
    }
    try {
        const updatedSensor = await res.sensor.save();
        res.json(updatedSensor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', getSensor, async (req, res) => {
    try {
        await res.sensor.remove();
        res.json({ message: 'Deleted sensor' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * Middleware function to get sensor by id
 */
async function getSensor(req, res, next) {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (sensor == null) {
            return res.status(404).json({ message: 'Cannot find sensor' });
        }
        res.sensor = sensor;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;

