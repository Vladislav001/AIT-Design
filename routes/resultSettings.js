// Модуль авторизации
var firebase = require('firebase');

// Т.к перенес на сокеты - пока не нужно
// exports.post = function(req, res, next) {
//
//   firebase.auth().onAuthStateChanged(user => {
//    if (user) {
//     //var refStudents = firebase.database().ref("students/" + "TnC8UsZuj5TBPJP4ckVhgV5qQle2/");
//     var refStudents = firebase.database().ref("students/" + req.params.idTag);
//
//     refStudents.once("value")
//      .then(function(snapshot) {
//        var currentTest = snapshot.child('current_test').val();
//
//        //Формируем узлы с номерами тестов и соответствующими под-узлами
//        var refNewTest = refStudents.child("tests/" + currentTest);
//
//        var refNewTestSettings = refNewTest.child("/settings");
//        var refNewTestManageButtons = refNewTest.child("/manage_buttons");
//
//        //Для обновления страницы - костыль
//        var linkResultSettings = "/" + currentTest + "/result_settings/id" + req.params.idTag;
//        res.redirect(linkResultSettings);
//      });
//
//     }
//   });
//
// };

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     var refStudents = firebase.database().ref("students/" + req.params.idTag);


      refStudents.once("value")
       .then(function(snapshot) {
         //var loginStudent = snapshot.child('login').val();
         var currentTest = snapshot.child('current_test').val();
         var refStudentsSettings = refStudents.child("tests/" + currentTest + "/settings/");
         var refStudentsManageButtons = refStudents.child("tests/" + currentTest + "/manage_buttons/");

         var linkTestSettings = "/" + currentTest + "/test_settings/id" + req.params.idTag;
         var linkUserTrainingSettings = "/" + currentTest + "/user_training_settings/id" + req.params.idTag;
         var linkPreResultSettings = "/" + currentTest + "/pre_result_settings/id" + req.params.idTag;
         var linkFinishSettings = "/" + currentTest + "/finish_settings/id" + req.params.idTag;

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
               var styleImagesSwap = snapshotManageButtons.child('style_images_swap_arrows').val();
               var styleImagesLikeDislike = snapshotManageButtons.child('style_images_like_dislike').val();
               var styleImageStopTest = snapshotManageButtons.child('style_image_stop_test').val();
               var styleImageResults = snapshotManageButtons.child('style_image_results').val();
               var styleImageFinish = snapshotManageButtons.child('style_image_finish').val();

               res.render("resultSettings", {
                  //  loginStudent: loginStudent,
                   currentTest: currentTest,
                   id: snapshot.key,

                   linkTestSettings: linkTestSettings,
                   linkUserTrainingSettings: linkUserTrainingSettings,
                   linkPreResultSettings: linkPreResultSettings,
                   linkFinishSettings: linkFinishSettings,

                   checkText: checkText,
                   checkSound: checkSound,
                   checkSwap: checkSwap,
                   checkSwapFinger: checkSwapFinger,
                   checkSwapArrows: checkSwapArrows,
                   checkProgressBar: checkProgressBar,
                   checkBtnResult: checkBtnResult,

                   styleImagesSwap: styleImagesSwap,
                   styleImagesLikeDislike: styleImagesLikeDislike,
                   styleImageStopTest: styleImageStopTest,
                   styleImageResults: styleImageResults,
                   styleImageFinish: styleImageFinish
                 });
             });



          });
      });
    }
  });

};
