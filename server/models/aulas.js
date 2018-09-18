const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aulasSchema = new Schema({
  aula: { type: 'String', required: true, trim: true}
});

module.exports = mongoose.model('Aulas', aulasSchema);