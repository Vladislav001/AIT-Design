
var async = require('async');
var firebase = require('firebase')
var config = {
  apiKey: "AIzaSyDIWcqGtk1OaGHXq1s8hNjF2_sGkg4iAgc",
  authDomain: "fir-auth-f9e4a.firebaseapp.com",
  databaseURL: "https://fir-auth-f9e4a.firebaseio.com",
  projectId: "fir-auth-f9e4a",
  storageBucket: "fir-auth-f9e4a.appspot.com",
  messagingSenderId: "761401610072"
};
firebase.initializeApp(config);

exports.post = function(req, res, next) {
  // Получаем данные, которые передал посетитель
  var email = req.body.email; // P.S req.body - нестандартное св-во, но в app.js есть middleware bodyParser(аналог)
  var password = req.body.password; // т.к он подключен до роута, то к моменту работы роута, bodyParser гарантированно прочитал все post данные
                                    // разобрал их и записал все поля формы в соответствующие сва-ва req.body

	const auth = firebase.auth();

     //Входим
   		const promise = auth.signInWithEmailAndPassword(email, password);


  // Добавляем слушателя в реальном времени-держать сессиюю????
   firebase.auth().onAuthStateChanged(firebaseUser => {
   	if (firebaseUser) {
   		console.log(firebaseUser);
      //window.location.href = "personalArea.html";
   	} else {
   		console.log('not logged in');

   	}
   });


};


exports.get = function(req, res) {
  res.render('login');
};
