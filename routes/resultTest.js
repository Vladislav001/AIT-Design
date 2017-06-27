// Модуль авторизации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');
var firebase = require('firebase');

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     // рисуем профиль юзера с данными из его документа
       res.render('resultTest',
         {
          EMAIL: user.email
         });
   }
  });

};
