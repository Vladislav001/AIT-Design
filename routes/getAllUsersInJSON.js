var express = require('express');
//var User = require('../../models/user').User;
//var HttpError = require('../../error').HttpError;
//var AuthError = require('../../models/user').AuthError;
var firebase = require('firebase');


// Получаем json - всех пользователей
exports.get = function(req, res, next) {

  var db = firebase.app().database().ref();
  var users = db.child('users');

  // var gg = db.child('child_added', snap => {
  //
  // });

  res.json(users);

  // User.find({}, function(err, users) {
  //    if (err) return next(err);
  //    res.json(users);
  // })

 };
