const express = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validateFields');
const { register, login, listUsers, createAdmin } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

router.get('/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});
// Ruta de registro
router.post('/register', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], register);

// Ruta de login
router.post('/login', [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/create-admin', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
], createAdmin);

router.get('/users', authenticateToken, checkRole(['admin']), listUsers);

module.exports = router;
