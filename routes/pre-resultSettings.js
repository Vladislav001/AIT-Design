// Модуль авторизации

// var User = require('../models/user').User;
// var HttpError = require('../error').HttpError;
// var AuthError = require('../models/user').AuthError;
var async = require('async');
var firebase = require('firebase');

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     var refStudents = firebase.database().ref("students/" + req.params.idTag);

      refStudents.once("value")
       .then(function(snapshot) {
         var loginStudent = snapshot.child('login').val();
         var linkTestSettings = "/test_settings/id" + req.params.idTag;
         var linkUserTrainingSettings = "/user_training_settings/id" + req.params.idTag;
         var linkResultSettings = "/result_settings/id" + req.params.idTag;
         var linkFinishSettings = "/finish_settings/id" + req.params.idTag;


         res.render("pre-resultSettings", {
             loginStudent: loginStudent,
             id: snapshot.key,

             linkTestSettings: linkTestSettings,
             linkUserTrainingSettings: linkUserTrainingSettings,
             linkResultSettings: linkResultSettings,
             linkFinishSettings: linkFinishSettings
         });
       });
    }
  });

};
