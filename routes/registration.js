
var async = require('async');
var firebase = require('firebase');
var configFirebase = require ('../config/configFirebase');

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  var password = req.body.password; // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные

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

var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  var userId = firebase.auth().currentUser.uid;
  console.log(userId + " userId");
  var ref = firebase.app().database().ref();
  var usersRef = ref.child('trainers/' + userId);
  // Create a new ref and log it’s push key
  //var userRef = usersRef.push();

  // Create a new ref and save data to it in one step
  var userRef = usersRef.set({
   email: email,
   password: password,
   accessLevel: "Trainer"
  });
  unsubscribe(); // 
}
});


}



exports.get = function(req, res) {

  res.render('registration');
};
