const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gruposSchema = new Schema({
  grupo: { type: 'String', required: true, trim: true},
  ciclo: { type: Schema.Types.ObjectId, required: true, ref: 'Ciclos' },
  ciclo_name: { type: 'String', required: true, trim: true },
  nivel: { type: Schema.Types.ObjectId, required: true, ref: 'Niveles' },
  nivel_name: { type: 'String', required: true, trim: true },
  grado: { type: Schema.Types.ObjectId, required: true, ref: 'Grados' },
  grado_name: { type: 'String', required: true, trim: true },
  campus: { type: Schema.Types.ObjectId, ref: 'Ciclos' },
  campus_name: { type: 'String', trim: true },
  aula: { type: Schema.Types.ObjectId, ref: 'Ciclos' },
  aula_name: { type: 'String', trim: true },
  profesores: [{ type: Schema.Types.ObjectId, ref: 'Profesores' }],
  conceptos: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Conceptos' },
    concepto: {type: "String", trime:true},
    monto: { type: Number, trim: true },
    periodicidad: { type: Boolean, default: false } //false = un solo pago, true = mensual
  }]
});

module.exports = mongoose.model('Grupos', gruposSchema);

/*
nombre: "tabla 5' barrote w/e"
producto: {type: Schema.objectId, ref: "articulos"}
produccion: [{
  insumo: {type: Schema.obje.......},
  qty: 
}];
*/