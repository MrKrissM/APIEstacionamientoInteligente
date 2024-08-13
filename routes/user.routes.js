const {Router} = require('express');
const {check} = require('express-validator');
const {createUserController, getUserController} = require('../controllers/user.controller');
const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
        validateFields
    ],
    createUserController
);

router.get('/', getUserController);

module.exports = router;