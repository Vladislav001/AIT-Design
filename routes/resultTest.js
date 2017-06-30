// Модуль результатов теста студентов
var firebase = require('firebase');

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {

    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     refStudents.once("value")
      .then(function(snapshot) {
        var loginStudent = snapshot.child('login').val();
        var link = "/test_settings/id" + req.params.idTag;

        res.render("resultTest", {
            loginStudent: loginStudent,
            id: snapshot.key,
            link: link
        });
      });

 }

  });
};
