const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require(bcrypt)

const usersSchema = new Schema({
  name: { type: 'String', required: true, trim: true},
  lastname: { type: 'String', required: true, trim: true},
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('Users', usersSchema);