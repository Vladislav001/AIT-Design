var firebase = require('firebase');

var config = {
   apiKey: "AIzaSyDivSiqkv7QoDAe8qiY1QevU5N4vQ7aHZw",
   authDomain: "profpref-c5ce0.firebaseapp.com",
   databaseURL: "https://profpref-c5ce0.firebaseio.com",
   projectId: "profpref-c5ce0",
   storageBucket: "profpref-c5ce0.appspot.com",
   messagingSenderId: "664101035809"
 };
var configFirebase = firebase.initializeApp(config);
module.exports.configFirebase = configFirebase.database(); //this doesnt have to be database only
