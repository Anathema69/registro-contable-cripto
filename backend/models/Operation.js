// backend/models/Operation.js
const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: String,
  amount: Number,
  type: {
    type: String,
    enum: ['ingreso', 'egreso'],
    default: 'ingreso'
  }
});

module.exports = mongoose.model('Operation', operationSchema);
