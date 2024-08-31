const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createOccupationController, 
    getOccupationsController,
    updateOccupationController,
    getOccupationByIdController,
    endOccupationController,
    deleteOccupationController
} = require('../controllers/occupation.controller');
const validateFields = require('../middlewares/validateFields');

const router = Router();

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

router.get(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        validateFields
    ],
    getOccupationByIdController
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