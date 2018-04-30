// Модуль личного кабинета

var firebase = require('firebase'); //https://metanit.com/web/nodejs/4.10.php


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
      var userId = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref("trainers/" + userId);


      ref.once("value")
        .then(function(snapshot) {
             accessLevel = snapshot.child("accessLevel").val();
               var refStudents = firebase.database().ref("students");
               var refTrainers = firebase.database().ref("trainers");
               var count_students = snapshot.child("count_students").val();

               // Подтягиваем студентов конкретного тренера
                refStudents.orderByChild("trainer_ID").equalTo(userId).on("child_added", function(snapshot) {
                  //console.log(snapshot.key);
                  links.push("result_test/id" + snapshot.key);
                  usernames.push(snapshot.child('name').val());
                  genders.push(snapshot.child('gender').val());
                  ages.push(snapshot.child('age').val());


                  //logins.push(snapshot.child('login').val());
                  //passwords.push(snapshot.child('password').val());

                  // СРАБОТАЕТ ЕСЛИ ЕСТЬ STUDENTS у данного тренера!!!
                  // if (usernames.length == count_students) {
                  //   res.render("personalArea", {
                  //       email: user.email,
                  //       accessLevel: accessLevel,
                  //
                  //       links: links,
                  //       usernames: usernames
                  //   });
                  // }
                });

                // Подтягиваем тренеров для главного админа
                refTrainers.on("child_added", function(snapshotTrainers) {
                  linksTrainers.push("coach/id" + snapshotTrainers.key);
                  emailTrainers.push(snapshotTrainers.child('email').val());
                  countStudents.push(snapshotTrainers.child('count_students').val());
                });

                unsubscribe(); // убирает состояние


                res.render("personalArea", {
                    email: user.email,
                    accessLevel: accessLevel,

                    links: links,
                    usernames: usernames,
                    genders: genders,
                    ages: ages,

                    linksTrainers: linksTrainers,
                    emailTrainers: emailTrainers,
                    countStudents: countStudents,
                    userId : userId
                });

        });
    }

  });

};
