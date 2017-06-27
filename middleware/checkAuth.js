var HttpError = require('../error').HttpError;
var firebase = require('firebase');

module.exports = function(req, res, next) {

  // if (!req.session.user) {
  //   return next(new HttpError(401, "Вы не авторизованы"));
  // }
  next();
};
