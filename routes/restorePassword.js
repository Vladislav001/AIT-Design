var async = require('async');
var firebase = require('firebase')

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
                              // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
  // Берем объект Auth
  var auth = firebase.auth();

  // Берем email
  var emailAddress = email;

  // Отправляем email с паролем
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email отправлен
  }, function(error) {
    // Ошибка
  });

}




exports.get = function(req, res) {

  res.render('restorePassword');
};
