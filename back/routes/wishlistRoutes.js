const Router = require('express').Router;
const {WishlistController} = require('../controllers');

const router = new Router();

router.get('/', WishlistController.getAllWishlist);
router.post('/', WishlistController.addToWishlist);
router.delete('/:id', WishlistController.removeFromWishlist);

module.exports = router;