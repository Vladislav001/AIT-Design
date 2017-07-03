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
  trainer_ID: trainer_ID,
  current_test: "1"
  });

  //Узнаем кол-во тестов у студента
  var refStudents = firebase.database().ref("students/" + userIdStudents + "/tests");
  var countTests = 1; // Кол-во тестов
  refStudents.orderByChild("tests").on("child_added", function(snapshot) {
   var student = snapshot.val();
   countTests++;
  });

  // Формируем узлы с номерами тестов и соответствующими под-узлами
  var refNewTest = usersRef.child("tests/" + countTests);
  var refNewTestSettings = refNewTest.child("/settings"); //
  var refNewTestPreTest = refNewTest.child("pre_test/");
  var refNewTestManageButtons = refNewTest.child("/manage_buttons");//
  var refNewTestQuestions = refNewTest.child("/questions");//
  //Для заполнения-посмотреть как выглядит в databaseьщ
  var refNewTestSettings = refNewTestSettings.set({
   text: "true",
   sound: "true",
   swap: "true",
   swap_finger: "true",
   swap_arrows: "true",
   progress_bar: "true",
   btn_results: "true"
  });

  var refNewTestPreTest = refNewTestPreTest.set({
    title_text_btn_back: "Button back",
    description_text_btn_back: "If you want to return to the previous question",
    title_text_btn_next: "Button next",
    description_text_btn_next: "If you want to go to the text question",
    title_text_btn_like: "Button like",
    description_text_btn_like: "If you like to click here",
    title_text_btn_dislike: "Button dislike",
    description_text_btn_dislike: "If you don't like to click here"

  });


   var refNewTestManageButtons = refNewTestManageButtons.set({
    style_images_swap_arrows: "0",
    style_images_like_dislike: "0",
    style_image_stop_test: "0",
    style_image_results: "0",
    style_image_finish: "0",
   });


  //
  // var refNewTestQuestions = refNewTestQuestions.set({
  //   questions: "questions"
  //   });
  //





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
