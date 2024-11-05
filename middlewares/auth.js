// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authenticateToken = async (req, res, next) => {
  // Lista de rutas que no requieren autenticación
  const publicRoutes = ['/api/auth/login', '/api/auth/register'];
  
  // Si la ruta actual está en la lista de rutas públicas, permite el acceso sin token
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        ok: false,
        message: 'No se proporcionó un token de autorización' 
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          ok: false,
          message: 'Token inválido o expirado' 
        });
      }
      User.findById(decoded.id)
        .select('-password')
        .then(user => {
          if (!user) {
            return res.status(404).json({ 
              ok: false,
              message: 'Usuario no encontrado' 
            });
          }
          // Agregar información de permisos al request
          req.user = {
            ...user.toObject(),
            isAdmin: user.role === 'admin',
            permissions: user.role === 'admin' ? [
              'create_user',
              'edit_user',
              'delete_user',
              'view_users',
              'create_admin',
              'manage_roles',
              'access_dashboard'
            ] : ['view_profile', 'edit_profile']
          };
          next();
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ 
            ok: false,
            message: 'Error en el servidor' 
          });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      ok: false,
      message: 'Error en el servidor' 
    });
  }
};

module.exports = { authenticateToken };