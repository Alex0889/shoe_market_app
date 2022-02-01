const Router = require('express').Router;
const sneakersRouter = require('./sneakersRoutes');
const cartRouter = require('./cartRoutes');
const wishlistRouter = require('./wishlistRoutes');
const userRouter = require('./userRoutes');

const router = new Router();

router.use("/items", sneakersRouter);
router.use("/cart", cartRouter);
router.use("/wishlist", wishlistRouter);
router.use("/user", userRouter);

module.exports = router;



