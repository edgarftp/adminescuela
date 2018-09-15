const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inscripcionesSchema = new Schema({
  alumno: {type: Schema.Types.ObjectId, ref: 'Alumnos'},
  grupo: {type: Schema.Types.ObjectId, ref: 'Grupos'},
  fechaDeInscripcion: {type: 'Date', default: Date.now, required: true},
  mensualidades: {type: Schema.Types.ObjectId, ref:"Mensualidades"},
  matricula:[{type: Schema.Types.ObjectId, ref: 'Conceptos'}],
  baja: {type: Boolean, default: false},
  fechaDeBaja: {type: 'Date'}
});

module.exports = mongoose.model('Inscripciones', inscripcionesSchema);