// Модуль авторизации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');

var firebase = require('firebase'); //https://metanit.com/web/nodejs/4.10.php

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     res.render("personalArea", {
         email: user.email
     });

   } else {
     console.log('not logged in');
   }
  });

};
