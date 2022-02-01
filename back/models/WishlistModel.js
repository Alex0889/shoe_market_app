const {Schema, model} = require('mongoose');

const WishlistSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    wishlist: {
      type: Object,
    },
  },
  {
    timestamps: true
  });


module.exports = model('wishlist', WishlistSchema, 'wishlist');