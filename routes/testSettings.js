// Модуль авторизации
var firebase = require('firebase');

exports.post = function(req, res, next) {

 var text = "yes";

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    //var refStudents = firebase.database().ref("students/" + "TnC8UsZuj5TBPJP4ckVhgV5qQle2/");
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     //Формируем узлы с номерами тестов и соответствующими под-узлами
     var refNewTest = refStudents.child("tests/" + "1/");
     var refNewTestSettings = refNewTest.child("/settings");
     var refNewTestManageButtons = refNewTest.child("/manage_buttons");

     var refNewTestSettings = refNewTestSettings.update({
      text: text,
      sound: "checked",
      swap: "true",
      swap_finger: "true",
      swap_arrows: "true",
      progress_bar: "true",
      btn_results: "true"
     });

    }
  });
 console.log(req.params.idTag + " req.params.idTag IN POST");
};

exports.get = function(req, res) {
  //var reqId = req.params.idTag;

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     var refStudents = firebase.database().ref("students/" + req.params.idTag); // в ejs лежит в запросе id

      refStudents.once("value")
       .then(function(snapshot) {
         var loginStudent = snapshot.child('login').val();
         var linkUserTrainingSettings = "/user_training_settings/id" + req.params.idTag;
         var linkPreResultSettings = "/pre_result_settings/id" + req.params.idTag;
         var linkResultSettings = "/result_settings/id" + req.params.idTag;
         var linkFinishSettings = "/finish_settings/id" + req.params.idTag;



         res.render("testSettings", {
             loginStudent: loginStudent,
             id: snapshot.key,

             linkUserTrainingSettings: linkUserTrainingSettings,
             linkPreResultSettings: linkPreResultSettings,
             linkResultSettings: linkResultSettings,
             linkFinishSettings: linkFinishSettings
         });
       });
    }
  });

};
