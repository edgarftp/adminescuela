const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagosSchema = new Schema({
  alumno: {type: Schema.Types.ObjectId, ref: 'Alumnos', required:true},
  inscripcion: {type: Schema.Types.ObjectId, ref: 'Inscripciones', required:true},
  ciclo: {type: Schema.Types.ObjectId, ref: 'Ciclos', required:true},
  ciclo_name: {type: "String", required: true, trim: true},
  concepto: {type: Schema.Types.ObjectId, ref: 'Conceptos', required:true},
  concepto_name: {type: "String", required: true, trim:true},
  monto: {type: 'Number', required: true, trim: true},
  vencimiento: {type: Date, required: true}

});

module.exports = mongoose.model('Pagos', pagosSchema);