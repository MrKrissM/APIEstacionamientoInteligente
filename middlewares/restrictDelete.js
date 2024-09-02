const restrictDelete = (req, res, next) => {
    if (req.method === 'DELETE' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar recursos' });
    }
    next();
  };
  
  module.exports = restrictDelete;