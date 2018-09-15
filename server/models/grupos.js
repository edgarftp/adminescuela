const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gruposSchema = new Schema({
  grupo: { type: 'String', required: true, trim: true, unique:true},
  aula: {type: 'String', trim: true},
  ciclo: {type: Schema.Types.ObjectId, ref: 'Ciclos'},
  nivel: {type: Schema.Types.ObjectId, ref: 'Niveles'},
  grado: {type: Schema.Types.ObjectId, ref: 'Grados'},
  profesores: [{type: Schema.Types.ObjectId, ref: 'Profesores'}]
});

module.exports = mongoose.model('Grupos', gruposSchema);