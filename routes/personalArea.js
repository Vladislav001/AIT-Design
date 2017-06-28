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
      var db = firebase.database();

      var ref = firebase.database().ref("trainers/" + userId);
      ref.once("value")
        .then(function(snapshot) {
          var age = snapshot.child("age").val();
          var gender = snapshot.child("gender").val();
          var name = snapshot.child("name").val();
          var accessLevel = snapshot.child("accessLevel").val();
          console.log(age + " age");

          res.render("personalArea", {
              email: user.email,
              accessLevel: accessLevel
          });
        });

        // res.render("personalArea", {
        //     user: user,
        //     email: user.email
        //
        // });


   } else {
     console.log('not logged in');
   }
  });

};
