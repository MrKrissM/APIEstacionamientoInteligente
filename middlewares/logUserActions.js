const UserActionLog = require('../models/userActionLog.model');

const logUserActions = async (req, res, next) => {
  if (req.user) {
    try {
      const logEntry = new UserActionLog({
        userId: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        method: req.method,
        endpoint: req.originalUrl
      });

      await logEntry.save();

    } catch (error) {
      console.error('Error al registrar la acción del usuario:', error);
    }
  }
  next();
};

module.exports = logUserActions;
