require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config');

const app = express();

dbConnection();

//middlewares
app.use(cors());
app.use(express.json());

app.use('/api/parking', require('./routes/parkingSpot.routes'));
app.use('/api/occupations', require('./routes/occupation.routes'));

app.listen(process.env.PORT, () => {
    console.log('El servidor está corriendo en el puerto: ' + process.env.PORT)
})