// backend/routes/operationRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOperation,
  getOperationsByUser,
  exportOperationsCSV
} = require('../controllers/operationController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/', authMiddleware, createOperation);
router.get('/', authMiddleware, getOperationsByUser);
router.get('/export', authMiddleware, exportOperationsCSV);

module.exports = router;
