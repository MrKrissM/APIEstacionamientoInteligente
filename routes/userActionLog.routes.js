const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');
const { getUserActions } = require('../controllers/userActionLog.controller');

const router = express.Router();

// Ruta para obtener las acciones de un usuario específico
router.get('/actions/:userId', authenticateToken, checkRole(['admin']), getUserActions);

module.exports = router;
