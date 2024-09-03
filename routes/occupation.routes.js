const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createOccupationController, 
    getOccupationsController,
    getActiveOccupationsController,
    getOccupationsByVehicleController,
    getOccupationsByParkingLotController,
    endOccupationController,
    updateOccupationController,
    deleteOccupationController
} = require('../controllers/occupation.controller');
const validateFields = require('../middlewares/validateFields');
const { authenticateToken } = require('../middlewares/auth');
const restrictDelete = require('../middlewares/restrictDelete');

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Aplicar restrictDelete a todas las rutas
router.use(restrictDelete);

// Crear una nueva ocupación
router.post(
    '/',
    [
        check('parkingLotName', 'El nombre del estacionamiento es obligatorio').notEmpty(),
        check('parkingSpotNumber', 'El número del espacio de estacionamiento es obligatorio').isInt(),
        check('vehiclePlate', 'La placa del vehículo es obligatoria').notEmpty(),
        check('startTime', 'La hora de inicio es obligatoria').isISO8601(),
        validateFields
    ],
    createOccupationController
);

// Obtener todas las ocupaciones
router.get('/', getOccupationsController);

// Obtener todas las ocupaciones activas
router.get('/active', getActiveOccupationsController);


// Obtener ocupaciones por vehículo
router.get(
    '/vehicle/:plate',
    [
        check('plate', 'La placa del vehículo es obligatoria').notEmpty(),
        validateFields
    ],
    getOccupationsByVehicleController
);

// Obtener ocupaciones por parking lot
router.get(
    '/parkinglot/:name',
    [
        check('name', 'El nombre del parking lot es obligatorio').notEmpty(),
        validateFields
    ],
    getOccupationsByParkingLotController
);


// Actualizar una ocupación
router.put(
    '/:id',
    [
        check('id', 'El ID de la ocupación no es válido').isMongoId(),
        validateFields
    ],
    updateOccupationController
);

module.exports = router;


// Finalizar una ocupación
router.put(
    '/:id/end',
    [
        check('id', 'El ID de la ocupación no es válido').isMongoId(),
        validateFields
    ],
    endOccupationController
);

// Eliminar una ocupación
router.delete(
    '/:id',
    [
        check('id', 'El ID de la ocupación no es válido').isMongoId(),
        validateFields
    ],
    deleteOccupationController
);

module.exports = router;