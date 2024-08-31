const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario o email ya existe'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            ok: true,
            message: 'Usuario registrado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales inválidas'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                ok: false,
                message: 'Credenciales inválidas'
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
      
          res.json({
            ok: true,
            token,
            role: user.role
          });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        });
    }
};

const listUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password'); 
      res.json({
        ok: true,
        users
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: 'Error al obtener la lista de usuarios'
      });
    }
  };

  const createAdmin = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const admin = new User({
        username,
        email,
        password: hashedPassword,
        role: 'admin'
      });
  
      await admin.save();
  
      res.status(201).json({
        ok: true,
        message: 'Administrador creado exitosamente'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: 'Error al crear administrador'
      });
    }
  };

module.exports = {
    register,
    login,
    listUsers,
    createAdmin
};