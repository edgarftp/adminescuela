const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradosSchema = new Schema({
  nombre: { type: 'String', required: true, trim: true},
});

module.exports = mongoose.model('Grados', gradosSchema);