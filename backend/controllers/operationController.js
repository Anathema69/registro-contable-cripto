// backend/controllers/operationController.js
const Operation = require('../models/Operation');
const User = require('../models/User');
const json2csv = require('json2csv').parse; // Para exportar en CSV

exports.createOperation = async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const newOp = new Operation({
      user: req.user.userId,
      description,
      amount,
      type
    });
    await newOp.save();
    res.json({ msg: 'Operación creada', operation: newOp });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la operación' });
  }
};

exports.getOperationsByUser = async (req, res) => {
  try {
    const operations = await Operation.find({ user: req.user.userId });
    res.json(operations);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener operaciones' });
  }
};

exports.exportOperationsCSV = async (req, res) => {
  try {
    // Si es admin, obtiene todas las operaciones, si es user, solo las suyas
    let operations;
    if (req.user.role === 'admin') {
      operations = await Operation.find().populate('user', 'email');
    } else {
      operations = await Operation.find({ user: req.user.userId });
    }
    const fields = ['_id', 'user.email', 'date', 'description', 'amount', 'type'];
    const csv = json2csv(operations, { fields });
    res.setHeader('Content-disposition', 'attachment; filename=operations.csv');
    res.set('Content-Type', 'text/csv');
    return res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ msg: 'Error al exportar CSV' });
  }
};
