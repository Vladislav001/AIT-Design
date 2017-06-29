//////////////////////////////////
// Модуль авторизации

//var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
//var AuthError = require('../models/user').AuthError;
var async = require('async');

var firebase = require('firebase'); //https://metanit.com/web/nodejs/4.10.php


exports.get = function(req, res) {

  var links = [];  // массив в котором будут храниться сформированные адреса профилей юзеров
	var usernames = []; // хранит email-ы юзеров
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
                  links.push(snapshot.key + "/resultTest");
                  usernames.push(snapshot.child('login').val());

                  if (usernames.length == count_students) {
                    res.render("personalArea", {
                        email: user.email,
                        accessLevel: accessLevel,

                        links: links,
                        usernames: usernames
                    });
                  }
                });
                unsubscribe(); // убирает состояние

        });
    }

  });

};
