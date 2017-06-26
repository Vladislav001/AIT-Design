// Модуль регистрации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');


exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
    var email = req.body.emailNewUser;// P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
    var password = req.body.passwordNewUser;// т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
  //  var username = req.body.usernameNewUser;// разобрал их и записал все поля формы в соответствующие сва-ва req.body
    //var age = req.body.ageNewUser; // разобрал их и записал все поля формы в соответствующие сва-ва req.body
  //  var gender = req.body.genderNewUser;


  console.log("MY EMAIL = " + email, password);
};
