// Модуль авторизации
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
         var linkPreResultSettings = "/pre_result_settings/id" + req.params.idTag;
         var linkFinishSettings = "/finish_settings/id" + req.params.idTag;


         res.render("resultSettings", {
             loginStudent: loginStudent,
             id: snapshot.key,

             linkTestSettings: linkTestSettings,
             linkUserTrainingSettings: linkUserTrainingSettings,
             linkPreResultSettings: linkPreResultSettings,
             linkFinishSettings: linkFinishSettings
         });
       });
    }
  });

};
