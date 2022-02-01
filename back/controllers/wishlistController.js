const {WishlistModel, Wishlist, SneakersModel} = require('../models');
const ApiError = require('../error-handler/errorApi');

class WishlistController {
  async getAllWishlist(req, res, next) {
    try {
      if (req.session.user) {
        const id = req.session.user._id;
        const {wishlist} = await WishlistModel.findOne({user: id});
        req.session.wishlist = {...req.session.wishlist, ...wishlist};
        console.log('getAllWishlist', req.session.wishlist)
        return res.json(Object.values(req.session.wishlist));
      }
      if (req.session.wishlist) {
        return res.json(Object.values(req.session.wishlist));
      }
      return res.json([]);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }

  async addToWishlist(req, res, next) {
    try {
      const {id} = req.body;
      const item = await SneakersModel.findById(id);
      const wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});
      const savedItem = wishlist.addToWishlist(item, item._id);
      req.session.wishlist = wishlist.items;
      console.log('addToWishlist', req.session.wishlist)
      if (req.session.user) {
        await WishlistModel.updateOne({user: req.session.user._id}, {wishlist: wishlist.items});
      }
      return res.json(savedItem);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }

  async removeFromWishlist(req, res, next) {
    try {
      const id = req.params.id;
      const wishlist = new Wishlist(req.session.wishlist ? req.session.wishlist : {});
      const item = wishlist.removeFromWishlist(id);
      const wishlistItems = wishlist.items;
      console.log('removeFromWishlist', wishlistItems)
      if (item) {
        req.session.wishlist = wishlistItems;
        if (req.session.user) {
          await WishlistModel.updateOne({user: id}, {cart: wishlistItems});
        }
      }
      return res.json(item);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }

  // async addToWishlist(req, res, next) {
  //   try {
  //     const {id} = req.body;
  //     if (!id) next();
  //     const wishlistItem = new WishlistModel({sneakers: id});
  //     const wishlistItemSaved = await wishlistItem.save();
  //     const wishlistItemPopulated = await wishlistItemSaved.populate('sneakers').execPopulate();
  //     return res.status(201).json(wishlistItemPopulated);
  //   } catch (e) {
  //     return res.status(500).json({message: e});
  //   }
  // }
  //
  // async removeFromWishlist(req, res, next) {
  //   try {
  //     const id = req.params.id;
  //     const data = await WishlistModel.findByIdAndDelete(id);
  //     return res.json(data);
  //   } catch (e) {
  //     return res.status(500).json({message: e});
  //   }
  // }
}

module.exports = new WishlistController();