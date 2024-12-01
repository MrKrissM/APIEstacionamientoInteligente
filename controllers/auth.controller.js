const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// En auth.controller.js
const registerByAdmin = async (req, res) => {
  try {
    // Verificar que solo un admin puede registrar usuarios
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        ok: false,
        message: 'Solo los administradores pueden registrar usuarios'
      });
    }

    const { username, email, password, role = 'user' } = req.body;

    // Verificar si el usuario o email ya existen
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        ok: false,
        message: 'Usuario o email ya existe'
      });
    }

    // Generar salt y hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario (con el rol especificado, por defecto 'user')
    const user = new User({ 
      username, 
      email, 
      password: hashedPassword,
      role 
    });
    await user.save();

    res.status(201).json({
      ok: true,
      message: 'Usuario registrado exitosamente',
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
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

      // Definir permisos basados en el rol
      const permissions = user.role === 'admin' ? [
          'create_user',
          'edit_user',
          'delete_user',
          'view_users',
          'create_admin',
          'manage_roles',
          'access_dashboard'
      ] : ['view_profile', 'edit_profile'];

      const token = jwt.sign(
          { 
              id: user._id, 
              role: user.role,
              isAdmin: user.role === 'admin'
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );
    
      res.json({
          ok: true,
          token,
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role,
              isAdmin: user.role === 'admin',
              permissions
          }
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

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado'
      });
    }

    await User.findByIdAndDelete(userId);

    res.json({
      ok: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: 'Error en el servidor'
    });
  }
};

const getUserProfile = (req, res) => {
  try {
    const user = req.user;

    res.json({
      ok: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: 'Error en el servidor'
    });
  }
};

const updateUser = async (req, res) => {
  try {
      const { userId } = req.params;
      const { username, email, role } = req.body;

      // Buscar y actualizar el usuario
      const user = await User.findByIdAndUpdate(
          userId, 
          { username, email, role }, 
          { new: true } // Devuelve el usuario actualizado
      );

      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({ 
          message: 'Usuario actualizado exitosamente', 
          user 
      });
  } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};


module.exports = {
  registerByAdmin,
  login,
  listUsers,
  createAdmin,
  deleteUser,
  getUserProfile,
  updateUser
};