// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../utils/authMiddleware');

// Nota: El registro lo protegemos con middleware para que
// solo un usuario con rol 'admin' pueda crear nuevos usuarios.
router.post('/register', authMiddleware, register);
router.post('/login', login);

module.exports = router;
