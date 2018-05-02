// Модуль авторизации
var firebase = require('firebase');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {

     res.render("updateTest", {
             userId : user.uid,
             testId : req.params.idTag
       });
    }
  });

};




exports.post = function(req, res, next) {



};
