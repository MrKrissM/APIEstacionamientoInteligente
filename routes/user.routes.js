const express = require('express');
const User = require('../models/user.model');
const {authenticateToken} = require('../middlewares/auth');

const router = express.Router();

// Ruta protegida de ejemplo
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;