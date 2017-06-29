// Модуль личного кабинета

var firebase = require('firebase'); //https://metanit.com/web/nodejs/4.10.php


exports.get = function(req, res) {

  var links = [];  // массив в котором будут храниться сформированные адреса профилей юзеров
	var usernames = []; // хранит имена юзеров
  var genders = []; // хранит пол юзеров
  var logins = []; // хранит логины юзеров
  var passwords = [] // хранит пароли юзеров

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
               var count_students = snapshot.child("count_students").val();
                refStudents.orderByChild("trainer_ID").equalTo(userId).on("child_added", function(snapshot) {
                  //console.log(snapshot.key);
                  links.push("resultTest/" + snapshot.key);
                  usernames.push(snapshot.child('name').val());
                  genders.push(snapshot.child('gender').val());
                  logins.push(snapshot.child('login').val());
                  passwords.push(snapshot.child('password').val());

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
                unsubscribe(); // убирает состояние
                res.render("personalArea", {
                    email: user.email,
                    accessLevel: accessLevel,

                    links: links,
                    usernames: usernames,
                    genders: genders,
                    logins: logins,
                    passwords: passwords
                });
        });
    }

  });

};
