const {SneakersModel} = require("../models");

class SneakersController {
  async getAll(req, res, next) {
    try {
      const sneakers = await SneakersModel.find();
      return res.json(sneakers);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new SneakersController();