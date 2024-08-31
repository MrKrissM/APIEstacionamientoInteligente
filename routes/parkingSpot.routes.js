const { Router } = require('express');
const { check } = require('express-validator');
const { createParkingSpotController, getParkingSpotsController, getParkingSpotByIdController, updateParkingSpotController, deleteParkingSpotController } = require('../controllers/parkingSpot.controller');
const validateFields = require('../middlewares/validateFields');

const router = Router();

router.post(
    '/',
    [
        check('parkingLotName', 'El nombre del estacionamiento es obligatorio').notEmpty(),
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

// Agregar la ruta DELETE
router.delete(
    '/:id',
    [
        check('id', 'El ID del espacio no es válido').isMongoId(),
        validateFields
    ],
    deleteParkingSpotController
);

module.exports = router;