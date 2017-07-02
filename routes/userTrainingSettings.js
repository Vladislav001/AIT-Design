// Модуль авторизации
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var textBackQuestion = req.body.inputTextBack;
  var textNextQuestion = req.body.inputTextNext;
  var textLikeQuestion = req.body.inputTextLike;
  var textDislikeQuestion = req.body.inputTextDislike;

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     //Формируем узлы с номерами тестов и соответствующими под-узлами
     var refNewTest = refStudents.child("tests/" + "1/");
     var refNewTestSettings = refNewTest.child("/settings");
     var refNewTestManageButtons = refNewTest.child("/manage_buttons");

     var refNewTestSettings = refNewTestSettings.update({
      text_back_question: textBackQuestion,
      text_next_question: textNextQuestion,
      text_like_question: textLikeQuestion,
      text_dislike_question: textDislikeQuestion
     });

    }
  });
  console.log(textBackQuestion + " textBackQuestion");
};

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {

    var refStudents = firebase.database().ref("students/" + req.params.idTag);
    var refStudentsSettings = refStudents.child("tests/1/settings/");

     refStudents.once("value")
      .then(function(snapshot) {
        var loginStudent = snapshot.child('login').val();
        var linkTestSettings = "/test_settings/id" + req.params.idTag;
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

           var textBackQuestion = snapshotSettings.child('text_back_question').val();
           var textNextQuestion = snapshotSettings.child('text_next_question').val();
           var textLikeQuestion = snapshotSettings.child('text_like_question').val();
           var textDislikeQuestion = snapshotSettings.child('text_dislike_question').val();

           res.render("userTrainingSettings", {
               loginStudent: loginStudent,
               id: snapshot.key,

               linkTestSettings: linkTestSettings,
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

               textBackQuestion: textBackQuestion,
               textNextQuestion: textNextQuestion,
               textLikeQuestion: textLikeQuestion,
               textDislikeQuestion: textDislikeQuestion
             });
           });

      });

  }
 });
};
