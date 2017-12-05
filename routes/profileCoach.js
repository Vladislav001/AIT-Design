var firebase = require('firebase');

exports.get = function(req, res) {

  // Для данных о студентах
  var links = [];  // массив в котором будут храниться сформированные адреса профилей юзеров
	var usernames = []; // хранит имена юзеров
  var genders = []; // хранит пол юзеров
  var ages = []; // хранит возраст юзеров

    // Для данных о тренерах
  var linksTrainers = [];
  var emailTrainers = [];
  var countStudents = [];
  var dateRegistration = [];

  var accessLevel;
  var unsubscribe = firebase.auth().onAuthStateChanged(user => {
    if (user) {

      //trainer
      var refTrainers = firebase.database().ref("trainers/" + req.params.idTag);

      refTrainers.once("value")
        .then(function(snapshot) {
               var refStudents = firebase.database().ref("students");

               var email = snapshot.child("email").val();
               var countStudents = snapshot.child("count_students").val();

               // Подтягиваем студентов конкретного тренера
                refStudents.orderByChild("trainer_ID").equalTo(snapshot.key).on("child_added", function(snapshot) {

                  // links.push("result_test/id" + snapshot.key);
                  usernames.push(snapshot.child('name').val());
                  genders.push(snapshot.child('gender').val());
                  ages.push(snapshot.child('age').val());
                });

                unsubscribe(); // убирает состояние
                res.render("profileCoach", {
                    id: snapshot.key,
                    email: email,
                    countStudents: countStudents,

                    // links: links,
                    usernames: usernames,
                    genders: genders,
                    ages: ages
                });

        });
    }

  });

};
