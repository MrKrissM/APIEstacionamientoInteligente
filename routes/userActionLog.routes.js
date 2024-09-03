const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const { getUserActions } = require('../controllers/userActionLog.controller');

const router = express.Router();

// Ruta para obtener las acciones de un usuario específico
router.get('/actions/:userId', authenticateToken, (req, res, next) => {
  if (req.user.role === 'admin' || req.user._id.toString() === req.params.userId) {
    next();
  } else {
    res.status(403).json({ message: 'No tienes permiso para ver estas acciones' });
  }
}, getUserActions);

module.exports = router;
