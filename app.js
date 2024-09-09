require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const logUserActions = require('./middlewares/logUserActions');
const {authenticateToken} = require('./middlewares/auth');
const formatDate = require('./middlewares/formatDate');

// Importar rutas de autenticación
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const userActionLogRoutes = require('./routes/userActionLog.routes');

const app = express();

dbConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(formatDate);

// Rutas públicas (sin autenticación)
app.use('/api/auth', authRoutes);

// Aplica authenticateToken a todas las demás rutas que comienzan con /api
app.use('/api', authenticateToken);

// Aplica logUserActions después de la autenticación
app.use('/api', logUserActions);

// Rutas protegidas
app.use('/api/parkinglots', require('./routes/parkingLot.routes'));
app.use('/api/parkingspots', require('./routes/parkingSpot.routes'));
app.use('/api/vehicles', require('./routes/vehicle.routes'));
app.use('/api/occupations', require('./routes/occupation.routes'));
app.use('/api/users', userRoutes);
app.use('/api/user-actions', userActionLogRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.listen(process.env.PORT, () => {
    console.log('El servidor está corriendo en el puerto: ' + process.env.PORT)
});

module.exports = app;