var firebase = require('firebase');

const config = {
  apiKey: "AIzaSyDIWcqGtk1OaGHXq1s8hNjF2_sGkg4iAgc",
  authDomain: "fir-auth-f9e4a.firebaseapp.com",
  databaseURL: "https://fir-auth-f9e4a.firebaseio.com",
  projectId: "fir-auth-f9e4a",
  storageBucket: "fir-auth-f9e4a.appspot.com",
  messagingSenderId: "761401610072"
};
var configFirebase = firebase.initializeApp(config);
module.exports.configFirebase = configFirebase.database(); //this doesnt have to be database only
