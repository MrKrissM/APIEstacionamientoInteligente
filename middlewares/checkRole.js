const checkRole = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "No autorizado" });
      }
  
      const hasRole = roles.find(role => req.user.role === role);
      if (!hasRole) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
      }
  
      next();
    }
  }
  
  module.exports = checkRole;