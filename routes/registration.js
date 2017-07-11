var firebase = require('firebase');
var configFirebase = require ('../config/configFirebase');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

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
    return next(new HttpError(403, error.message)); //403 - отказ регистрации
  } else {
      console.log(errorMessage + "errorMessage");
  }
  console.log(error + "error");
  // [END_EXCLUDE]
  });

var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  var userId = firebase.auth().currentUser.uid;

  var ref = firebase.app().database().ref();
  var usersRef = ref.child('trainers/' + userId);
  // Create a new ref and log it’s push key
  //var userRef = usersRef.push();

  // Create a new ref and save data to it in one step
  var userRef = usersRef.set({
   email: email,
   password: password,
   count_students: 0,
   accessLevel: "Trainer"
  });

  //Отправляем ему email
  //(содержание email определяется в Консоли Firebase)
  user.sendEmailVerification().then(function() {
    // Email успешно отправлен
  }, function(error) {
    // Ошибка
  });

  unsubscribe(); // убирает состояние
}
});


}



exports.get = function(req, res) {

  res.render('registration');
};
