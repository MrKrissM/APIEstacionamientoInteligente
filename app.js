require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');

const app = express();

dbConnection();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/parkinglots', require('./routes/parkingLot.routes'));
app.use('/api/parkingspots', require('./routes/parkingSpot.routes'));
app.use('/api/vehicles', require('./routes/vehicle.routes'));
app.use('/api/occupations', require('./routes/occupation.routes'));

app.listen(process.env.PORT, () => {
    console.log('El servidor está corriendo en el puerto: ' + process.env.PORT)
});

module.exports = app;