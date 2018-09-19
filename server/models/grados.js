const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradosSchema = new Schema({
  grado: { type: 'String', required: true, trim: true}
});

module.exports = mongoose.model('Grados', gradosSchema);