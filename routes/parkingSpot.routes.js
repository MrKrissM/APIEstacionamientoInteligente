const { Router } = require('express');
const { check } = require('express-validator');
const { createParkingSpotController, getParkingSpotsController, getParkingSpotByIdController, updateParkingSpotController } = require('../controllers/parkingSpot.controller');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/',
    [
        check('parkingLot', 'El ID del estacionamiento es obligatorio').isMongoId(),
        check('number', 'El número de espacio es obligatorio').not().isEmpty(),
        validateFields
    ],
    createParkingSpotController
);

router.get('/', getParkingSpotsController);

router.put(
    '/:id',
    [
        check('id', 'El ID del espacio no es válido').isMongoId(),
        check('isOccupied', 'El estado de ocupación debe ser un booleano').optional().isBoolean(),
        check('vehicle', 'La placa del vehículo no debe exceder 100 caracteres').optional().isString().isLength({ max: 100 }),
        validateFields
    ],
    updateParkingSpotController
);

// Agregar una ruta para obtener un espacio específico
router.get(
    '/:id',
    [
        check('id', 'El ID del espacio no es válido').isMongoId(),
        validateFields
    ],
    getParkingSpotByIdController
);

module.exports = router;