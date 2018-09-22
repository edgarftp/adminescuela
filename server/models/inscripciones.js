const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inscripcionesSchema = new Schema({
  alumno: {type: Schema.Types.ObjectId, ref: 'Alumnos', required:true},
  grupo: {type: Schema.Types.ObjectId, ref: 'Grupos', required:true},
  fechaDeInscripcion: {type: 'Date', default: Date.now, required: true},
  baja: {type: Boolean, default: false},
  fechaDeBaja: {type: 'Date'}
});

module.exports = mongoose.model('Inscripciones', inscripcionesSchema);