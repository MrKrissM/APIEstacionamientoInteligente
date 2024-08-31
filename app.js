require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Importar rutas de autenticación
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas existentes
app.use('/api/parkinglots', require('./routes/parkingLot.routes'));
app.use('/api/parkingspots', require('./routes/parkingSpot.routes'));
app.use('/api/vehicles', require('./routes/vehicle.routes'));
app.use('/api/occupations', require('./routes/occupation.routes'));

// Nuevas rutas de autenticación y usuario
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log('El servidor está corriendo en el puerto: ' + process.env.PORT)
});

module.exports = app;