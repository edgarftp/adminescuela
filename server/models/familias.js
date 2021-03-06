const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familiasSchema = new Schema({
  papa: { 
      nombre: {type: 'String', trim: true},
      telCelular: {type: 'String', trim: true},
      telOficina: {type: 'String', trim: true},
      trabajo: {type: 'String', trim: true},
      email: {type: 'String', trim: true}

    },
  mama: { 
      nombre: {type: 'String', trim: true},
      telCelular: {type: 'String', trim: true},
      telOficina: {type: 'String', trim: true},
      trabajo: {type: 'String', trim: true},
      email: {type: 'String', trim: true}
    },
  direccion: { 
      calle: {type: 'String', trim: true},
      numero: {type: 'String', trim: true},
      apartamento: {type: 'String', trim: true},
      colonia: {type: 'String', trim: true},
    },
  telCasa: {type: 'String', trim: true}
});

module.exports = mongoose.model('Familias', familiasSchema);