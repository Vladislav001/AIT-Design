// Модуль авторизации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');

exports.get = function(req, res) {
  res.render('userTrainingSettings');
};
