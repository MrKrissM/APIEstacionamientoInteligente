const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createOccupationController, 
    getOccupationsController,
    updateOccupationController,
    endOccupationController
} = require('../controllers/occupation.controller');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

// Crear una nueva ocupación
router.post(
    '/',
    [
        check('ParkingSpot', 'El ID del espacio de estacionamiento es obligatorio').isMongoId(),
        check('vehiclePlate', 'La placa del vehículo es obligatoria').not().isEmpty(),
        check('startTime', 'La hora de inicio es obligatoria').isISO8601(),
        check('endTime', 'La hora de finalización es obligatoria').isISO8601(),
        validateFields
    ],
    createOccupationController
);

// Obtener todas las ocupaciones
router.get('/', getOccupationsController);

// Actualizar una ocupación
router.put(
    '/:id',
    [
        check('id', 'El ID de la ocupación no es válido').isMongoId(),
        validateFields
    ],
    updateOccupationController
);

// Finalizar una ocupación
router.put(
    '/:id/end',
    [
        check('id', 'El ID de la ocupación no es válido').isMongoId(),
        check('endTime', 'La hora de finalización es obligatoria').isISO8601(),
        validateFields
    ],
    endOccupationController
);

module.exports = router;