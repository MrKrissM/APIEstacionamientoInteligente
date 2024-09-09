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
      return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
      }
      User.findById(decoded.id)
        .select('-password')
        .then(user => {
          if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
          }
          req.user = user;
          next();
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Error en el servidor' });
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { authenticateToken };