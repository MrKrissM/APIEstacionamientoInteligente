const { Router } = require('express');
const { check } = require('express-validator');
const {
    createParkingLotController,
    getParkingLotsController,
    getParkingLotByIdController,
    updateParkingLotController,
    deleteParkingLotController,
    getParkingSpotsByParkingLotController,
    createSpotsForParkingLotController  
} = require('../controllers/parkingLot.controller');
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
        check('name', 'El nombre es obligatorio').not().isEmpty().isLength({ max: 255 }),
        check('address', 'La dirección es obligatoria').not().isEmpty().isLength({ max: 255 }),
        check('floors', 'El número de pisos es obligatorio').isInt({ min: 1 }),
        check('totalSpots', 'El número total de espacios es obligatorio').isInt({ min: 1 }),
        validateFields
    ],
    createParkingLotController
);

router.get('/', getParkingLotsController);

router.get(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        validateFields
    ],
    getParkingLotByIdController
);

router.get(
    '/:id/spots',
    [
        check('id', 'El ID no es válido').isMongoId(),
        validateFields
    ],
    getParkingSpotsByParkingLotController  // Necesitaremos crear este controlador
);

router.put(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        check('name', 'El nombre es obligatorio').optional().not().isEmpty().isLength({ max: 255 }),
        check('address', 'La dirección es obligatoria').optional().not().isEmpty().isLength({ max: 255 }),
        check('floors', 'El número de pisos debe ser un número entero positivo').optional().isInt({ min: 1 }),
        check('totalSpots', 'El número total de espacios debe ser un número entero positivo').optional().isInt({ min: 1 }),
        validateFields
    ],
    updateParkingLotController
);

router.delete(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        validateFields
    ],
    deleteParkingLotController
);

router.post(
    '/:id/spots/create',
    [
        check('id', 'El ID no es válido').isMongoId(),
        check('quantity', 'La cantidad de espacios es requerida').isInt({ min: 1 }),
        validateFields
    ],
    createSpotsForParkingLotController
);

module.exports = router;