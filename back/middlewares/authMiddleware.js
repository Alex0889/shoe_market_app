// const jwt = require('jsonwebtoken');
const ApiError = require('../error-handler/errorApi');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    if (!req.session.user) {
      next(ApiError.unauthorizedError());
    }
    next();
  } catch (e) {
    next(ApiError.unauthorizedError());
  }
}

// const token = req.headers.authorization.split(' ')[1];
// if (!token) {
//   return res.status(401).json({message: "Not authorized"});
// }
// req.user = jwt.verify(token, process.env.SECRET_KEY);