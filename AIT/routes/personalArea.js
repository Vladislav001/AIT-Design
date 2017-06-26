// Модуль авторизации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');

var firebase = require('firebase')
// var config = {
//   apiKey: "AIzaSyDIWcqGtk1OaGHXq1s8hNjF2_sGkg4iAgc",
//   authDomain: "fir-auth-f9e4a.firebaseapp.com",
//   databaseURL: "https://fir-auth-f9e4a.firebaseio.com",
//   projectId: "fir-auth-f9e4a",
//   storageBucket: "fir-auth-f9e4a.appspot.com",
//   messagingSenderId: "761401610072"
// };
// firebase.initializeApp(config);

exports.get = function(req, res) {
  res.render('personalArea');


  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     console.log(user.email + " GET ЗАПРОС in personalArea");
     //window.location.href = "personalArea.html";

   } else {
     console.log('not logged in ОДАДА');
   }  console.log(user.email);
  });


};
