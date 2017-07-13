// Модуль авторизации
var firebase = require('firebase');

exports.post = function(req, res, next) {

  var textTitleStopTest = req.body.inputTitleStopTest;
  var textTitleBackQuestion = req.body.inputTitleTextBack;
  var textTitleNextQuestion = req.body.inputTitleTextNext;
  var textTitleLikeQuestion = req.body.inputTitleTextLike;
  var textTitleDislikeQuestion = req.body.inputTitleTextDislike;

  var textStopTest = req.body.inputTextStopTest;
  var textBackQuestion = req.body.inputTextBack;
  var textNextQuestion = req.body.inputTextNext;
  var textLikeQuestion = req.body.inputTextLike;
  var textDislikeQuestion = req.body.inputTextDislike;

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
    var refStudents = firebase.database().ref("students/" + req.params.idTag);

    refStudents.once("value")
     .then(function(snapshot) {
      var currentTest = snapshot.child('current_test').val();

       //Формируем узлы с номерами тестов и соответствующими под-узлами
      var refNewTest = refStudents.child("tests/" + currentTest);
      var refNewTestSettings = refNewTest.child("/settings");
      var refStudentsPreTest = refStudents.child("tests/" + currentTest + "/pre_test/");
      var refNewTestManageButtons = refNewTest.child("/manage_buttons");

      var refNewTestSettings = refStudentsPreTest.update({
       title_text_btn_stop: textTitleStopTest,
       description_text_btn_stop: textStopTest,

       title_text_btn_back: textTitleBackQuestion, // Заголовок
       description_text_btn_back: textBackQuestion, // Описание

       title_text_btn_next: textTitleNextQuestion,
       description_text_btn_next: textNextQuestion,

       title_text_btn_like: textTitleLikeQuestion,
       description_text_btn_like: textLikeQuestion,

       title_text_btn_dislike: textTitleDislikeQuestion,
       description_text_btn_dislike: textDislikeQuestion
      });

      //Для обновления страницы - костыль
      var linkUserTrainingSettings = "/" + currentTest + "/user_training_settings/id" + req.params.idTag;
      res.redirect(linkUserTrainingSettings);
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
        var currentTest = snapshot.child('current_test').val();
        var refStudentsSettings = refStudents.child("tests/" + currentTest + "/settings/");
        var refStudentsManageButtons = refStudents.child("tests/" + currentTest + "/manage_buttons/");
        var refStudentsPreTest = refStudents.child("tests/" + currentTest + "/pre_test/");
        var linkTestSettings = "/" + currentTest +  "/test_settings/id" + req.params.idTag;
        var linkPreResultSettings = "/" + currentTest +  "/pre_result_settings/id" + req.params.idTag;
        var linkResultSettings = "/" + currentTest +  "/result_settings/id" + req.params.idTag;
        var linkFinishSettings = "/" + currentTest +  "/finish_settings/id" + req.params.idTag;

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


              refStudentsPreTest.once("value")
               .then(function(snapshotSettingsPreTest) {
                 var textTitleStopTest = snapshotSettingsPreTest.child('title_text_btn_stop').val();
                 var textStopTest = snapshotSettingsPreTest.child('description_text_btn_stop').val();

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
                     currentTest: currentTest,
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

                     textTitleStopTest: textTitleStopTest,
                     textStopTest: textStopTest,
                     textTitleBackQuestion: textTitleBackQuestion,
                     textBackQuestion: textBackQuestion,
                     textTitleNextQuestion: textTitleNextQuestion,
                     textNextQuestion: textNextQuestion,
                     textTitleLikeQuestion: textTitleLikeQuestion,
                     textLikeQuestion: textLikeQuestion,
                     textTitleDislikeQuestion: textTitleDislikeQuestion,
                     textDislikeQuestion: textDislikeQuestion,

                     styleImagesSwap: styleImagesSwap,
                     styleImagesLikeDislike: styleImagesLikeDislike,
                     styleImageStopTest: styleImageStopTest
                   });
                 });



            });








          });
      });
  }
 });
};
