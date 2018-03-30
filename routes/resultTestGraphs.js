// Модуль результатов теста студентов
var firebase = require('firebase');

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     // Получаем доступ к Хранилищу
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     refStudents.once("value")
      .then(function(snapshot) {
        var currentTest = snapshot.child('current_test').val();
        var currentResult = snapshot.child('current_result_web').val();

       res.render("resultTestGraphs", {
           currentTest: currentTest,
           currentResult: currentResult,
          id: snapshot.key
       });
     });
    }
  });
};


exports.get = function(req, res) {

  var countResults;
  var countQuestionsInResult = [];

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     // Получаем доступ к Хранилищу
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     refStudents.once("value")
      .then(function(snapshot) {
        //var loginStudent = snapshot.child('login').val();
        var nameStudent = snapshot.child('name').val();
        var genderStudent = snapshot.child('gender').val();
        var ageStudent = snapshot.child('age').val();
        //var passwordStudent = snapshot.child('password').val();
        var currentTest = snapshot.child('current_test').val();
        var currentResult = snapshot.child('current_result_web').val();

        // Для отображения текущего логина и пароля картинками
        var currentLogin_1 = snapshot.child('login').val()[0];
        var currentLogin_2 = snapshot.child('login').val()[1];
        var currentLogin_3 = snapshot.child('login').val()[2];
        var currentLogin_4 = snapshot.child('login').val()[3];
        var currentLogin_5 = snapshot.child('login').val()[4];
        var currentLogin_6 = snapshot.child('login').val()[5];
        var currentLogin_7 = snapshot.child('login').val()[6];

        var currentPassword_1 = snapshot.child('password').val()[0];
        var currentPassword_2 = snapshot.child('password').val()[1];
        var currentPassword_3 = snapshot.child('password').val()[2];
        var currentPassword_4 = snapshot.child('password').val()[3];
        var currentPassword_5 = snapshot.child('password').val()[4];
        var currentPassword_6 = snapshot.child('password').val()[5];
        var currentPassword_7 = snapshot.child('password').val()[6];


        // Подкгружаем из хранилища набор дефолтных каритнок для составления логина и пароля
         var url_1_login= "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentLogin_1 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_2_login = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentLogin_2 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_3_login = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentLogin_3 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_4_login = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentLogin_4 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_5_login  = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentLogin_5 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_6_login  = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentLogin_6 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_7_login  = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentLogin_7 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";

         var url_1_password = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentPassword_1 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_2_password = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentPassword_2 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_3_password = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentPassword_3 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_4_password = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentPassword_4 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_5_password  = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentPassword_5 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_6_password  = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentPassword_6 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";
         var url_7_password  = "https://firebasestorage.googleapis.com/v0/b/profpref-c5ce0.appspot.com/o/entrance%2F" + currentPassword_7 + ".png?alt=media&token=41d83b72-77fa-4adc-8c74-0762dad52e8d";


        var link = "/" + currentTest + "/test_settings/id" + req.params.idTag;

       var refNumbersResults = refStudents.child("/student_state");
       var refResultStudents = refStudents.child("tests/" + currentTest + "/results/" + currentResult);
       var refCurrentQuestion = refStudents.child("/student_state");

       refNumbersResults.once("value").then(function(snapshotNumbersResults) {
         var numbersResults = snapshotNumbersResults.child('current_result').val();

        refCurrentQuestion.once("value")
         .then(function(snapshotState) {
           var currentQuestion = snapshotState.child('current_question').val();
           var currentState = snapshotState.child('state').val();

           res.render("resultTestGraphs", {
               nameStudent: nameStudent,
               genderStudent: genderStudent,
               ageStudent: ageStudent,
               currentTest: currentTest,
               currentResult: currentResult,

               id: snapshot.key,
               link: link,
               numbersResults: numbersResults,
               currentQuestion: currentQuestion,
               currentState: currentState,

               url_1_login: url_1_login,
               url_2_login: url_2_login,
               url_3_login: url_3_login,
               url_4_login: url_4_login,
               url_5_login: url_5_login,
               url_6_login: url_6_login,
               url_7_login: url_7_login,

               url_1_password: url_1_password,
               url_2_password: url_2_password,
               url_3_password: url_3_password,
               url_4_password: url_4_password,
               url_5_password: url_5_password,
               url_6_password: url_6_password,
               url_7_password: url_7_password,
           });
         });

      });
     });
    }
  });
};
