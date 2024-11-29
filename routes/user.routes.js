const express = require('express');
const User = require('../models/user.model');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

// Ruta para obtener todos los usuarios (solo para admins)
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Verificar si el usuario es admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        ok: false, 
        message: 'No tienes permisos para ver todos los usuarios' 
      });
    }

    const users = await User.find().select('-password');
    res.json({
      ok: true,
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      ok: false, 
      message: 'Error al obtener usuarios' 
    });
  }
});

// Ruta para editar un usuario (solo para admins)
router.put('/:userId', authenticateToken, async (req, res) => {
  try {
    // Verificar si el usuario es admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        ok: false, 
        message: 'No tienes permisos para editar usuarios' 
      });
    }

    const userId = req.params.userId;
    const { username, email, role } = req.body;

    // Validaciones básicas
    if (!username || !email || !role) {
      return res.status(400).json({ 
        ok: false, 
        message: 'Todos los campos son obligatorios' 
      });
    }

    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { username, email, role }, 
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        ok: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({
      ok: true,
      user: updatedUser,
      message: 'Usuario actualizado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      ok: false, 
      message: 'Error al actualizar usuario' 
    });
  }
});

// Ruta para eliminar un usuario (solo para admins)
router.delete('/:userId', authenticateToken, async (req, res) => {
  try {
    // Verificar si el usuario es admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        ok: false, 
        message: 'No tienes permisos para eliminar usuarios' 
      });
    }

    const userId = req.params.userId;
    
    // No permitir eliminar al último admin
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (adminCount <= 1) {
      return res.status(400).json({ 
        ok: false, 
        message: 'No puedes eliminar al último administrador' 
      });
    }

    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        message: 'Usuario no encontrado' 
      });
    }

    res.json({
      ok: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      ok: false, 
      message: 'Error al eliminar usuario' 
    });
  }
});

module.exports = router;