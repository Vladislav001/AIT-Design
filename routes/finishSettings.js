// Модуль авторизации
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var styleImageFinish = req.body.styleImageFinish;


  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     //Формируем узлы с номерами тестов и соответствующими под-узлами
     var refNewTest = refStudents.child("tests/" + "1/");
     var refNewTestSettings = refNewTest.child("/settings");
     var refNewTestManageButtons = refNewTest.child("/manage_buttons");

     var refNewTestManageButtons = refNewTestManageButtons.update({
      style_image_finish: styleImageFinish
     });

    }
  });

};

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     var refStudents = firebase.database().ref("students/" + req.params.idTag);
     var refStudentsSettings = refStudents.child("tests/1/settings/");
     var refStudentsManageButtons = refStudents.child("tests/1/manage_buttons/");

      refStudents.once("value")
       .then(function(snapshot) {
         var loginStudent = snapshot.child('login').val();
         var linkTestSettings = "/test_settings/id" + req.params.idTag;
         var linkUserTrainingSettings = "/user_training_settings/id" + req.params.idTag;
         var linkPreResultSettings = "/pre_result_settings/id" + req.params.idTag;
         var linkResultSettings = "/result_settings/id" + req.params.idTag;

         refStudentsSettings.once("value")
          .then(function(snapshotSettings) {
            var checkText = snapshotSettings.child('text').val();
            var checkSound = snapshotSettings.child('sound').val();
            var checkSwap = snapshotSettings.child('swap').val();
            var checkSwapFinger = snapshotSettings.child('swap_finger').val();
            var checkSwapArrows = snapshotSettings.child('swap_arrows').val();
            var checkProgressBar = snapshotSettings.child('progress_bar').val();
            var checkBtnResult = snapshotSettings.child('btn_results').val();

            refStudentsManageButtons.once("value")
             .then(function(snapshotManageButtons) {
               var styleImageStopTest = snapshotManageButtons.child('style_image_stop_test').val();
               var styleImageFinish = snapshotManageButtons.child('style_image_finish').val();

               res.render("finishSettings", {
                   loginStudent: loginStudent,
                   id: snapshot.key,

                   linkTestSettings: linkTestSettings,
                   linkUserTrainingSettings: linkUserTrainingSettings,
                   linkPreResultSettings: linkPreResultSettings,
                   linkResultSettings: linkResultSettings,

                   checkText: checkText,
                   checkSound: checkSound,
                   checkSwap: checkSwap,
                   checkSwapFinger: checkSwapFinger,
                   checkSwapArrows: checkSwapArrows,
                   checkProgressBar: checkProgressBar,
                   checkBtnResult: checkBtnResult,

                   styleImageStopTest: styleImageStopTest,
                   styleImageFinish: styleImageFinish
                 });
             });


            });
       });
    }
  });

};
