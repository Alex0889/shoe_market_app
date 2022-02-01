const {Schema, model} = require('mongoose');

const SneakersSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true
  },
  imageUrl: {
    type: String,
    require: true,
  }
});

module.exports = model('sneakers', SneakersSchema);