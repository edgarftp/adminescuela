const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnosSchema = new Schema({
  matricula: {type: 'Number', required: true, unique: true},
  primerNombre: { type: 'String', required: true, trim: true},
  segundoNombre: { type: 'String', trim: true},
  apellidoPaterno: { type: 'String', required: true, trim: true},
  apellidoMaterno: { type: 'String', trim: true},
  sexo: { type: 'Boolean', default: false }, // 0 (false) para masculino, 1 (true) para femenino
  fechaNacimiento: {type:Date, required: true},
  curp: { type: 'String', trim: true},
  procedencia: { 
      escuela: {type: 'String', trim: true},
      ciudad: {type: 'String', trim: true, default: 'Reynosa'}
    },
  familia: {type: Schema.Types.ObjectId, ref: 'Familia'}
});

module.exports = mongoose.model('Alumnos', alumnosSchema);