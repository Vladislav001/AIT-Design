// Модуль регистрации

// var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');
var firebase = require('firebase')



exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
    var login = req.body.loginNewUser + "@gmail.com";
    var password = req.body.passwordNewUser;
    var name = req.body.usernameNewUser;// P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
    var age = req.body.ageNewUser;                                      // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
    var gender = req.body.genderNewUser;

    var trainer_ID = firebase.auth().currentUser.uid;
  //  console.log(accessLevel + " accessLevel");

  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(login, password).then(function(user) {
    var userIdStudents = firebase.auth().currentUser.uid;

  var ref = firebase.app().database().ref();
  var usersRef = ref.child('students/' + userIdStudents);
  var userRef = usersRef.set({
  login: login,
  password: password,
  name: name,
  age: age,
  gender: gender,
  trainer_ID: trainer_ID
  });

  //получить тренера
  //и нарастить у него поле counte
  var refTrainer = firebase.database().ref("trainers/" + trainer_ID);

  refTrainer.once("value")
    .then(function(snapshot) {
         var count_students = snapshot.child("count_students").val();
         var newCountStudents = count_students + 1;
         firebase.database().ref("trainers/" + trainer_ID).update({
         count_students: newCountStudents
        });
  });






    firebase.auth().signOut();
    //Входим
  //   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // });
  });


};


// if (accessLevel == "Student") {
//   var ref = firebase.app().database().ref();
//   var usersRef = ref.child('trainers/' + userId + "/students");
//   // Create a new ref and log it’s push key
//   //var userRef = usersRef.push();
//
//   // Create a new ref and save data to it in one step
//   var userRef = usersRef.set({
//    email: email,
//    password: password,
//    name: name,
//    age: age,
//    gender: gender,
//    accessLevel: accessLevel,
//    trainer_ID: userId
//   });
// } else if (accessLevel == "Trainer") {
//   var ref = firebase.app().database().ref();
//   var usersRef = ref.child('trainers');
//   // Create a new ref and log it’s push key
//   //var userRef = usersRef.push();
//
//   // Create a new ref and save data to it in one step
//   var userRef = usersRef.set({
//    email: email,
//    password: password,
//    name: name,
//    age: age,
//    gender: gender,
//    accessLevel: accessLevel,
//    admin_ID: userId
//   });
// }
