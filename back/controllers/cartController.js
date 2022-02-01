const {Cart, CartModel, SneakersModel, OrderModel} = require('../models');
const ApiError = require('../error-handler/errorApi');

class CartController {
  async getAllCart(req, res, next) {
    try {
      if (req.session.user) {
        const id = req.session.user._id;
        const {cart} = await CartModel.findOne({user: id});
        req.session.cart = {...req.session.cart, ...cart};
        return res.json(Object.values(req.session.cart));
      }
      if (req.session.cart) {
        return res.json(Object.values(req.session.cart));
      }
      return res.json([]);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }

  async addToCart(req, res, next) {
    try {
      const {id} = req.body;
      const item = await SneakersModel.findById(id);
      const cart = new Cart(req.session.cart ? req.session.cart : {});
      const savedItem = cart.addToCart(item, item._id);
      req.session.cart = cart.items;
      if (req.session.user) {
        await CartModel.updateOne({user: req.session.user._id}, {cart: cart.items});
      }
      return res.json(savedItem);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }

  async removeFromCart(req, res, next) {
    try {
      const id = req.params.id;
      const cart = new Cart(req.session.cart ? req.session.cart : {});
      const item = cart.removeFromCart(id);
      const cartItems = cart.items;
      req.session.cart = cartItems;
      if (req.session.user) {
        console.log('in')
        await CartModel.updateOne({user: id}, {cart: cartItems});
      }

      return res.json(item);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }

  async checkout(req, res, next) {
    try {
      if (req.session.user) {
        const user = req.session.user._id;
        const {cart} = await CartModel.findOne({user});
        const order = await OrderModel.create({user: req.session.user._id, order: cart});
        await order.save();
        await CartModel.updateOne({user}, {cart: null});
        req.session.cart = null;
        return res.json({email: req.session.user.email, name: req.session.user.name});
      }
      return res.json(null);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }


  // async removeFromCart(req, res, next) {
  //   try {
  //     const id = req.params.id;
  //     const data = await CartModel.findByIdAndDelete(id);
  //     return res.json(data);
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async addToCart(req, res, next) {
  //   try {
  //     const {id} = req.body;
  //     if (!id) next();
  //     const cartItem = new CartModel({sneakers: id});
  //     const cartItemSaved = await cartItem.save();
  //     const cartItemPopulated = await cartItemSaved.populate('sneakers').execPopulate();
  //     return res.status(201).json(cartItemPopulated);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

module.exports = new CartController();