const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campusSchema = new Schema({
  campus: { type: 'String', required: true, trim: true}
});

module.exports = mongoose.model('Campus', campusSchema);