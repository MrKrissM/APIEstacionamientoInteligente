const UserActionLog = require('../models/userActionLog.model');

const getUserActions = async (req, res) => {
  try {
    const { userId } = req.params;

    const actions = await UserActionLog.find({ userId }).sort({ timestamp: -1 });

    res.json({
      ok: true,
      actions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: 'Error al obtener las acciones del usuario'
    });
  }
};

module.exports = {
  getUserActions
};
