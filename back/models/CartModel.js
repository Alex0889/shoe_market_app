const {Schema, model} = require('mongoose');

const CartSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cart: {
      type: Object,
    },
  },
  {
    timestamps: true
  });

module.exports = model('cart', CartSchema, 'cart');