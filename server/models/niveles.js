const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nivelesSchema = new Schema({
  nivel: { type: 'String', required: true, trim: true}
});

module.exports = mongoose.model('Niveles', nivelesSchema);