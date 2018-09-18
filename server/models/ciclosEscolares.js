const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cicloSchema = new Schema({
  ciclo: { type: 'String', required: true, trim: true}
});

module.exports = mongoose.model('Ciclos', cicloSchema);