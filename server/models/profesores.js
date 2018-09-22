const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profesoresSchema = new Schema({
  nombre: { type: 'String', required: true, trim: true}
});

module.exports = mongoose.model('Profesores', profesoresSchema);