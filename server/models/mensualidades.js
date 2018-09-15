const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradosSchema = new Schema({
  nombre: { type: 'String', required: true, trim: true},
  pagos: {type: 'Number', required: true, trum: true},
  inicio: {tipe: 'Date', required: true}
});

module.exports = mongoose.model('Grados', gradosSchema);