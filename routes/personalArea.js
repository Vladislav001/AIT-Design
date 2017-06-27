// Модуль авторизации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');

var firebase = require('firebase'); //https://metanit.com/web/nodejs/4.10.php


exports.get = function(req, res) {

  var links = [];  // массив в котором будут храниться сформированные адреса профилей юзеров
	var emails = []; // хранит email-ы юзеров

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
      var userId = firebase.auth().currentUser.uid;

        console.log(userId + " THIS USER");

     res.render("personalArea", {
         user: user,
         email: user.email

     });

   } else {
     console.log('not logged in');
   }
  });

};
