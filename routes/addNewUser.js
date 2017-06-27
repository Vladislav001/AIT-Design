// Модуль регистрации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');
var firebase = require('firebase')

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
    var email = req.body.emailNewUser;// P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
    var password = req.body.passwordNewUser;// т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные


  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
   var errorMessage = error.message;
  // [START_EXCLUDE]
  if (errorCode == 'auth/weak-password') {
    console.log('The password is too weak.');
  } else {
    console.log(errorMessage);
  }
  console.log(error);
  // [END_EXCLUDE]
  });  // [END createwithemail]

};
