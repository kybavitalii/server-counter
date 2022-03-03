const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, unique: true, require: true },
  counters: [{ type: Object, ref: 'Counter' }],
});

module.exports = model('User', User);
