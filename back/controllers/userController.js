const {validationResult} = require('express-validator');
const ApiError = require('../error-handler/errorApi');
const {UserModel, CartModel, WishlistModel} = require('../models');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const generateJWT = (email, name) => {
//   return jwt.sign(
//     {email, name},
//     process.env.SECRET_KEY,
//     {expiresIn: '24h'}
//   );
// }

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest('Error during authorization', errors.array()));
      }
      const {email, password, name} = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Bad email or password'));
      }
      const candidate = await UserModel.findOne({email});
      if (candidate) {
        return next(ApiError.badRequest('This email is already taken'));
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await UserModel.create({email, password: hashedPassword, name});
      const cart = await CartModel.create({user: user._id, cart: req.session.cart || []});
      await cart.save();
      const wishlist = await WishlistModel.create({user: user._id, wishlist: req.session.wishlist || []});
      await wishlist.save();
      const savedUser = await user.save();
      req.session.user = savedUser;
      // const token = generateJWT(savedUser.email, savedUser.name);
      return res.status(201).json({email: savedUser.email, name: savedUser.name});

    } catch (e) {
      return res.status(500).json({message: e});
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email});
      if (!user) {
        return next(ApiError.internal('Wrong email or password'));
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal('Wrong email or password'));
      }
      const {cart} = await CartModel.findOne({user: user._id});
      const {wishlist} = await WishlistModel.findOne({user: user._id});
      req.session.user = user;
      console.log('login req.session.cart', req.session.cart)
      console.log('login req.session.wishlist', req.session.wishlist)
      req.session.cart = {...req.session.cart, ...cart};
      req.session.wishlist = {...req.session.wishlist, ...wishlist};
      console.log('login cart', req.session.cart)
      console.log('login wishlist', req.session.wishlist)
      await CartModel.updateOne({user: req.session.user._id}, {cart: req.session.cart});
      await WishlistModel.updateOne({user: req.session.user._id}, {wishlist: req.session.wishlist});
      return res.json({
        user: {email: user.email, name: user.name},
        cart: Object.values(req.session.cart),
        wishlist: Object.values(req.session.wishlist)
      });
      // const token = generateJWT(user.email, user.name);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }

  logout(req, res, next) {
    req.session.destroy(() => {
      res.clearCookie('sid').sendStatus(200);
    });
    return res.status(200);
  }

  async refresh(req, res, next) {
    try {
      if (req.session.user) {
        const {email, name} = req.session.user;
        req.session.touch();
        return res.json({email, name});
      }
      return res.json(null);
    } catch (e) {
      next(ApiError.internal(e));
    }
  }
}

module.exports = new UserController();