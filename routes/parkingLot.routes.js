const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createParkingLotController, 
    getParkingLotsController,
    getParkingLotByIdController,
    updateParkingLotController,
    deleteParkingLotController
} = require('../controllers/parkingLot.controller');
const validateFields = require('../middlewares/validateFields');

const router = Router();

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

module.exports = router;