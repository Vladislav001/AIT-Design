// Модуль регистрации

// var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');
var firebase = require('firebase')



exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
    var email = req.body.emailNewUser;
    var password = req.body.passwordNewUser;
    var name = req.body.usernameNewUser;// P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
    var age = req.body.ageNewUser;                                      // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
    var gender = req.body.genderNewUser;
    //var accessLevel = req.body.accessLevelNewUser;

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

  // firebase.auth().onAuthStateChanged(user => {
  //  if (user) {
  //     var uidCreator = firebase.auth().currentUser.uid;
  //  }
  // });



  var ref = firebase.app().database().ref();
  var usersRef = ref.child('users');
  // Create a new ref and log it’s push key
  //var userRef = usersRef.push();

  // Create a new ref and save data to it in one step
  var userRef = usersRef.push({
   email: email,
   password: password,
   name: name,
   age: age,
   gender: gender
  });

  // function writeUserData(userId, email, password, name, age) {
  //   firebase.database().ref('users/' + userId).set({
  //     email: email,
  //     password: password,
  //     name: name,
  //     age: age,
  //     gender: gender,
  //     accessLevel: accessLevel,
  //     uidCreator: uidCreator
  //   });
  // }


};
