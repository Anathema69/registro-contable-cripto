// backend/controllers/operationController.js
const Operation = require('../models/Operation');
const json2csv = require('json2csv').parse;
const User = require('../models/User');

// Crear operación
exports.createOperation = async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const newOp = new Operation({
      user: req.user.userId,
      description,
      amount,      // decimales
      type
      // date se asigna por default
    });
    await newOp.save();
    res.json({ msg: 'Operación creada', operation: newOp });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la operación' });
  }
};

// Obtener operaciones del usuario logueado
// (luego en el frontend limitaremos a 3)
exports.getOperationsByUser = async (req, res) => {
  try {
    // Solo las del usuario actual
    const operations = await Operation.find({ user: req.user.userId })
      .sort({ date: -1 }); // Ordenadas desc
    res.json(operations);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener operaciones' });
  }
};

// Exportar CSV con filtros (solo admin ve todo, user ve las suyas)
exports.exportOperationsCSV = async (req, res) => {
  try {
    // Obtenemos los posibles filtros desde la query
    // filterUserId puede contener uno o varios IDs separados por coma (e.g., "id1,id2,id3")
    // startDate y endDate para filtrar por rango de fechas
    const { filterUserId, startDate, endDate } = req.query;
    
    // Construimos un objeto `query` que luego usaremos en el .find()
    let query = {};

    // Si no es admin, solo puede ver sus propias operaciones
    if (req.user.role !== 'admin') {
      query.user = req.user.userId;
    } else {
      // Si es admin y se ha enviado un filtro de usuarios
      if (filterUserId) {
        // Convertimos la cadena en un array de IDs
        const ids = filterUserId.split(',');
        if (ids.length > 0) {
          // Filtramos por cualquier ID en el array
          query.user = { $in: ids };
        }
      }
    }

    // Filtrado por rango de fechas
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        // Mayor o igual que la fecha de inicio
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        // Menor o igual que la fecha de fin
        query.date.$lte = new Date(endDate);
      }
    }

    // Realizamos la consulta en MongoDB
    // populate('user', 'email') para incluir el email del usuario en los resultados
    const operations = await Operation.find(query).populate('user', 'email');

    // Definimos las columnas (campos) que queremos en el CSV
    const fields = ['_id', 'user.email', 'date', 'description', 'amount', 'type'];

    // Convertimos los documentos a CSV
    const csv = json2csv(operations, { fields });

    // Configuramos la respuesta para descargar el archivo CSV
    res.setHeader('Content-disposition', 'attachment; filename=operations.csv');
    res.set('Content-Type', 'text/csv');

    // Enviamos el CSV
    return res.status(200).send(csv);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al exportar CSV' });
  }
};

