const {model, Schema} = require('mongoose');

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  order: {
    type: Object
  }
}, {timestamps: true});

module.exports = model('order', OrderSchema);