var firebase = require ('firebase');

exports.post = function(req, res) {
  firebase.auth().signOut().then(function() {
  // Логаут прошел успешно
}).catch(function(error) {
  // Ошибка
});
   res.redirect('/'); // перенаправить посетителя на главную
};
