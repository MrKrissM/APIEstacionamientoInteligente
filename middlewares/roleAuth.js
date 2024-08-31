const roleAuth = (roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "No autorizado" });
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "No tienes permiso para realizar esta acción" });
      }
      next();
    }
  };
  
  module.exports = roleAuth;