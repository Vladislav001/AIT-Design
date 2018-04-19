// Модуль авторизации
var firebase = require('firebase');
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;

exports.get = function(req, res) {

  firebase.auth().onAuthStateChanged(user => {
   if (user) {
     var refStudents = firebase.database().ref("students/" + req.params.idTag);

      refStudents.once("value")
       .then(function(snapshot) {

         //var linkAddTest=  "/add_test/id" + req.params.idTag;

         res.render("addTest", {
             id: snapshot.key
           });
      });  
    }
  });

};




exports.post = function(req, res, next) {

  var ref = firebase.app().database().ref();
  // правильно путь построить надо + не статичнывй id
  var studentNewTest = ref.child('students/' + '-L2aMREULtADaXTlJUfR' );

  var categories = [];

  // Вместо 3 надо по норму
  for(var i=0; i<3; i++){
    categories[i] = req.body['category_' + i];
  }

// Не так как надо робит
  for(var i=0; i<3; i++){
    var studentNewTest = studentNewTest.push({
     name: categories[i]
    });
  }



};
