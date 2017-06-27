
var async = require('async');
var firebase = require('firebase')
var configFirebase = require ('../config/configFirebase');

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  var password = req.body.password; // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
	const auth = firebase.auth();

  //Входим
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // [START_EXCLUDE]
  if (errorCode === 'auth/wrong-password') {
      console.log('Wrong password.');
  } else {
      console.log(errorMessage + "errorMessage");
  }
  console.log(error + "error");
  // [END_EXCLUDE]
});

// [END authwithemail]
firebase.auth().onAuthStateChanged(user => {
 if (user) {
   console.log(user.email + " POST ЗАПРОС");
   //window.location.href = "personalArea.html";

 } else {
   console.log('not logged in');
 }
});


}




exports.get = function(req, res) {
  res.render('login');

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     console.log(user.email + " GET ЗАПРОС in login");
     //window.location.href = "personalArea.html";

   } else {
     console.log('not logged in');
   }
  });
};
