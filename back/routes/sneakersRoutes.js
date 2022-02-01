const Router = require('express').Router;
const {SneakersController} = require('../controllers');

const router = new Router();

router.get("/", SneakersController.getAll);

module.exports = router;