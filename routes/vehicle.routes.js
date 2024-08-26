const { Router } = require('express');
const { check } = require('express-validator');
const { 
    createVehicleController, 
    getVehiclesController,
    getVehicleByIdController,
    updateVehicleController,
    deleteVehicleController
} = require('../controllers/vehicle.controller');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/',
    [
        check('plate', 'La placa es obligatoria').not().isEmpty().isLength({ max: 100 }),
        check('type', 'El tipo de vehículo es obligatorio').not().isEmpty().isLength({ max: 100 }),
        validateFields
    ],
    createVehicleController
);

router.get('/', getVehiclesController);

router.get(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        validateFields
    ],
    getVehicleByIdController
);

router.put(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        check('plate', 'La placa no debe exceder 100 caracteres').optional().isLength({ max: 100 }),
        check('type', 'El tipo de vehículo no debe exceder 100 caracteres').optional().isLength({ max: 100 }),
        validateFields
    ],
    updateVehicleController
);

router.delete(
    '/:id',
    [
        check('id', 'El ID no es válido').isMongoId(),
        validateFields
    ],
    deleteVehicleController
);

module.exports = router;