const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const usersSchema = new Schema({
  name: { type: 'String', required: true, trim: true},
  lastname: { type: 'String', required: true, trim: true},
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Users', usersSchema);