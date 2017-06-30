// Модуль результатов теста студентов
var firebase = require('firebase');

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {

    var refStudents = firebase.database().ref("students/" + req.params.idTag);

     refStudents.once("value")
      .then(function(snapshot) {
        var loginStudent = snapshot.child('login').val();
        var nameStudent = snapshot.child('name').val();
        var genderStudent = snapshot.child('gender').val();
        var ageStudent = snapshot.child('age').val();
        var passwordStudent = snapshot.child('password').val();

        var link = "/test_settings/id" + req.params.idTag;

        res.render("resultTest", {
            loginStudent: loginStudent,
            nameStudent: nameStudent,
            genderStudent: genderStudent,
            ageStudent: ageStudent,
            passwordStudent: passwordStudent,
            
            id: snapshot.key,
            link: link
        });
      });

 }

  });
};
