// Модуль авторизации
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var checkText = Boolean(req.body.checkText);
  var checkSound = Boolean(req.body.checkSound);
  var checkSwap = Boolean(req.body.checkSwap);
  var checkSwapFinger = Boolean(req.body.checkSwapFinger);
  var checkSwapArrows = Boolean(req.body.checkSwapArrows);
  var checkProgressBar = Boolean(req.body.checkProgressBar);
  var checkBtnResult = Boolean(req.body.checkBtnResult);
  var styleImagesLikeDislike = req.body.styleImagesLikeDislike;
 
  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    //var refStudents = firebase.database().ref("students/" + "TnC8UsZuj5TBPJP4ckVhgV5qQle2/");
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     //Формируем узлы с номерами тестов и соответствующими под-узлами
     var refNewTest = refStudents.child("tests/" + "1/");
     var refNewTestSettings = refNewTest.child("/settings");
     var refNewTestManageButtons = refNewTest.child("/manage_buttons");

     var refNewTestSettings = refNewTestSettings.update({
      text: checkText,
      sound: checkSound,
      swap: checkSwap,
      swap_finger: checkSwapFinger,
      swap_arrows: checkSwapArrows,
      progress_bar: checkProgressBar,
      btn_results: checkBtnResult,
     });


     var refNewTestManageButtons = refNewTestManageButtons.update({
      style_images_like_dislike: styleImagesLikeDislike
     });



    }
  });

};

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     var refStudents = firebase.database().ref("students/" + req.params.idTag); // в ejs лежит в запросе id
     var refStudentsSettings = refStudents.child("tests/1/settings/");
     var refStudentsManageButtons = refStudents.child("tests/1/manage_buttons/");


      refStudents.once("value")
       .then(function(snapshot) {
         var loginStudent = snapshot.child('login').val();
         var linkUserTrainingSettings = "/user_training_settings/id" + req.params.idTag;
         var linkPreResultSettings = "/pre_result_settings/id" + req.params.idTag;
         var linkResultSettings = "/result_settings/id" + req.params.idTag;
         var linkFinishSettings = "/finish_settings/id" + req.params.idTag;

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
                  var styleImagesLikeDislike = snapshotManageButtons.child('style_images_like_dislike').val();

                  res.render("testSettings", {
                      loginStudent: loginStudent,
                      id: snapshot.key,

                      linkUserTrainingSettings: linkUserTrainingSettings,
                      linkPreResultSettings: linkPreResultSettings,
                      linkResultSettings: linkResultSettings,
                      linkFinishSettings: linkFinishSettings,

                      checkText: checkText,
                      checkSound: checkSound,
                      checkSwap: checkSwap,
                      checkSwapFinger: checkSwapFinger,
                      checkSwapArrows: checkSwapArrows,
                      checkProgressBar: checkProgressBar,
                      checkBtnResult: checkBtnResult,

                      styleImagesLikeDislike: styleImagesLikeDislike
                    });

                   });





            });



       });
    }
  });

};
