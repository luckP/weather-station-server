const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Connect to MongoDB
 */
const uri = process.env.MONGODB_URI;
async function connectMongodb() {
    try {
        await mongoose.connect(uri, {
            authSource: "admin",
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err.message);
    }
}
connectMongodb();


const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Wellcome to https://weather-station-server.lucppi.com/');
});

app.use('/sensors', require('./routers/sensors'));
app.use('/sensorReadings', require('./routers/sensorReadings'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});