const { Router } = require('express');
const { check } = require('express-validator');
const { createParkingSpotController, getParkingSpotsController, getParkingSpotByIdController, getParkingSpotsByParkingLotNameController, updateParkingSpotController, deleteParkingSpotController } = require('../controllers/parkingSpot.controller');
const validateFields = require('../middlewares/validateFields');
const { authenticateToken } = require('../middlewares/auth');
const restrictDelete = require('../middlewares/restrictDelete');

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Aplicar restrictDelete a todas las rutas
router.use(restrictDelete);

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

// Obtener parking spots por nombre de parking lot
router.get(
    '/parkinglot/:parkingLotName',
    [
        check('parkingLotName', 'El nombre del parking lot es obligatorio').notEmpty(),
        validateFields
    ],
    getParkingSpotsByParkingLotNameController
);

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