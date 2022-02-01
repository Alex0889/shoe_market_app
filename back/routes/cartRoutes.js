const Router = require('express').Router;
const {CartController} = require('../controllers');

const router = new Router();

router.get('/', CartController.getAllCart);
router.delete('/:id', CartController.removeFromCart);
router.post('/', CartController.addToCart);
router.get('/checkout', CartController.checkout);

module.exports = router;