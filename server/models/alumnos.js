const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumnosSchema = new Schema({
  matricula: {type: 'String', required: true, unique: true},
  nombre: { type: 'String', required: true, trim: true},
  apellidoP: { type: 'String', required: true, trim: true},
  apellidoM: { type: 'String', trim: true},
  sexo: { type: 'Boolean', default: false }, // 0 (false) para masculino, 1 (true) para femenino
  fechaNacimiento: {type:Date},
  curp: { type: 'String', trim: true},
  procedencia: { 
      escuela: {type: 'String', trim: true},
      ciudad: {type: 'String', trim: true, default: 'Reynosa'}
    },
  familia: {type: Schema.Types.ObjectId, ref: 'Familia'}
});

module.exports = mongoose.model('Alumnos', alumnosSchema);