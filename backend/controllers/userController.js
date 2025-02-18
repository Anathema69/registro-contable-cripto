// backend/controllers/userController.js
const User = require('../models/User');

// Actualiza datos del usuario logueado
exports.updateMe = async (req, res) => {
  try {
    const { birthdate, accountNumber, phone } = req.body;
    // Buscar el usuario por su ID (req.user.userId viene del middleware)
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    // Actualizar campos si existen
    if (birthdate) user.birthdate = birthdate;
    if (accountNumber) user.accountNumber = accountNumber;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ msg: 'Datos actualizados correctamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar datos' });
  }
};

// Obtener todos los usuarios (para el admin, para listar en combo box)
exports.getAllUsers = async (req, res) => {
  try {
    // Se podría filtrar, paginar, etc.
    const users = await User.find({}, 'name email'); 
    // Retornamos solo algunos campos para no exponer contraseñas
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener usuarios' });
  }
};
