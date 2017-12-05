// Пока не пашет !!! - проблемы с удаление зависимых студентов
var firebase = require('firebase');

exports.post = function(req, res, next) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     var refTrainers = firebase.database().ref("trainers/" + req.params.idTag);

     // refTrainers.once("value")
     //   .then(function(snapshot) {
     //          var refStudents = firebase.database().ref("students");
     //
     //          // Подтягиваем студентов конкретного тренера
     //           refStudents.orderByChild("trainer_ID").equalTo(snapshot.key).remove();
     //   });
var refStudents = firebase.database().ref("students");
       refStudents.orderByChild("trainer_ID").equalTo(req.params.idTag).remove();

     firebase.database().ref("trainers/" + req.params.idTag).remove();
    }
  });

};
