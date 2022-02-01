const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    require: true,
  },
}, {
  timestamps: true
});

module.exports = model('user', UserSchema);