const Router = require('express');
const {UserController} = require('../controllers');
const {body} = require('express-validator');

const router = new Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({min: 4, max: 12}),
  UserController.registration);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

module.exports = router;