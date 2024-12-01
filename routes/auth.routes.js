// auth.routes.js
const express = require('express');
const { check } = require('express-validator');
const validateFields = require('../middlewares/validateFields');
const { registerByAdmin, login, listUsers, createAdmin, deleteUser, getUserProfile,updateUser } = require('../controllers/auth.controller');
const {authenticateToken} = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const logUserActions = require('../middlewares/logUserActions');

const router = express.Router();

router.get('/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// Ruta de registro
router.post('/register-user', 
    authenticateToken, 
    checkRole(['admin']), 
    [
      check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
      check('email', 'El email no es válido').isEmail(),
      check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
      check('role').optional().isIn(['user', 'admin']),
      validateFields
    ], 
    registerByAdmin
  );

// Única ruta de login
router.post('/login', [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/create-admin', 
    authenticateToken, 
    checkRole(['admin']), 
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        validateFields
    ], 
    createAdmin
);

router.get('/users', authenticateToken, checkRole(['admin']), logUserActions, listUsers);
router.delete('/users/:userId', authenticateToken, checkRole(['admin']), logUserActions, deleteUser);
router.get('/profile', authenticateToken, logUserActions, getUserProfile);
router.put('/users/:userId', authenticateToken, checkRole(['admin']), logUserActions, updateUser);

module.exports = router;