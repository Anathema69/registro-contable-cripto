// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const { updateMe, getAllUsers } = require('../controllers/userController');

// Actualizar datos del usuario logueado
router.put('/me', authMiddleware, updateMe);

// Obtener todos los usuarios (para admin)
router.get('/', authMiddleware, getAllUsers);

module.exports = router;
