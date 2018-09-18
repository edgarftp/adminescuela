const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conceptosSchema = new Schema({
  concepto: { type: 'String', required: true, trim: true},
  periodicidad: {type: Boolean, required: true, trim: true, default: false} //false = un solo pago, true = mensual
});

module.exports = mongoose.model('Conceptos', conceptosSchema);