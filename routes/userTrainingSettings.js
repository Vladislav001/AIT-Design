// Модуль авторизации
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var textTitleBackQuestion = req.body.inputTitleTextBack;
  var textTitleNextQuestion = req.body.inputTitleTextNext;
  var textTitleLikeQuestion = req.body.inputTitleTextLike;
  var textTitleDislikeQuestion = req.body.inputTitleTextDislike;

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
     var refStudentsPreTest = refStudents.child("tests/1/pre_test/");
     var refNewTestManageButtons = refNewTest.child("/manage_buttons");

     var refNewTestSettings = refStudentsPreTest.update({
      title_text_btn_back: textTitleBackQuestion, // Заголовок
      description_text_btn_back: textBackQuestion, // Описание

      title_text_btn_next: textTitleNextQuestion,
      description_text_btn_next: textNextQuestion,

      title_text_btn_like: textTitleLikeQuestion,
      description_text_btn_like: textLikeQuestion,

      title_text_btn_dislike: textTitleDislikeQuestion,
      description_text_btn_dislike: textDislikeQuestion
     });

    }
  });
  console.log(textTitleNextQuestion + " textTitleNextQuestion");
};

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    var refStudents = firebase.database().ref("students/" + req.params.idTag);
    var refStudentsSettings = refStudents.child("tests/1/settings/");
    var refStudentsManageButtons = refStudents.child("tests/1/manage_buttons/");
    var refStudentsPreTest = refStudents.child("tests/1/pre_test/");

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

           refStudentsManageButtons.once("value")
            .then(function(snapshotManageButtons) {
              var styleImagesSwap = snapshotManageButtons.child('style_images_swap_arrows').val();
              var styleImagesLikeDislike = snapshotManageButtons.child('style_images_like_dislike').val();

              refStudentsPreTest.once("value")
               .then(function(snapshotSettingsPreTest) {
                 var textTitleBackQuestion = snapshotSettingsPreTest.child('title_text_btn_back').val();
                 var textBackQuestion = snapshotSettingsPreTest.child('description_text_btn_back').val();

                 var textTitleNextQuestion = snapshotSettingsPreTest.child('title_text_btn_next').val();
                 var textNextQuestion = snapshotSettingsPreTest.child('description_text_btn_next').val();

                 var textTitleLikeQuestion = snapshotSettingsPreTest.child('title_text_btn_like').val();
                 var textLikeQuestion = snapshotSettingsPreTest.child('description_text_btn_like').val();

                 var textTitleDislikeQuestion = snapshotSettingsPreTest.child('title_text_btn_dislike').val();
                 var textDislikeQuestion = snapshotSettingsPreTest.child('description_text_btn_dislike').val();

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

                     textTitleBackQuestion: textTitleBackQuestion,
                     textBackQuestion: textBackQuestion,
                     textTitleNextQuestion: textTitleNextQuestion,
                     textNextQuestion: textNextQuestion,
                     textTitleLikeQuestion: textTitleLikeQuestion,
                     textLikeQuestion: textLikeQuestion,
                     textTitleDislikeQuestion: textTitleDislikeQuestion,
                     textDislikeQuestion: textDislikeQuestion,

                     styleImagesSwap: styleImagesSwap,
                     styleImagesLikeDislike: styleImagesLikeDislike
                   });
                 });



            });








          });
      });
  }
 });
};
