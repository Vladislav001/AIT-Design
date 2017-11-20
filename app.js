var express = require('express'); // фреймворк для Node.Js
var http = require('http');
var path = require('path');
//var config = require('./config'); // !!!СОБСТВЕННЫЙ!!! модуль config
//var log = require('./lib/log')(module);
//var session = require('express-session'); // специальный middleware
//const FirebaseStore = require('connect-session-firebase')(session);
var HttpError = require('./error').HttpError;
var firebase = require('firebase');
var configFirebase = require ('./config/configFirebase');
//var ref = firebase.app().database().ref();




// Создать приложение (создает функцию, чтобы обрабатывать запросы)
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


// ejs-locals(шаблонная система) - почти тоже, что и ejs, но есть layoyt partial block
app.engine('ejs', require('ejs-locals')); //т.е ejs не очень хорошо справляется с тем, что должно быть много почти одинаковых страних

// Настройки для системы шаблонизации
app.set('views', __dirname + '/template');

// Движок для шаблонов - ejs
app.set('view engine', 'ejs');

// connect-овский middleware (стандартный)
// если url вот такой /favicon.ico, то читает favico-ку,
// а иначе передает управление дальше
app.use(express.favicon());

// logger - middleware (стандартный )
if (app.get('env') == 'development') {
  // Выводит запись о том, что же за запрос нам пришел - в консоли(например GET / 404 7ms)
  app.use(express.logger('dev')); // 'dev' - формат логгирования
} else {
  app.use(express.logger('default'));
}

//2 строчки ниже вместо - app.use(express.bodyParser());
// Считываем form, которые присланы методом 'post', json - данные, присланные этим методом
// Т.е разбирает тело запроса
app.use(express.json());
app.use(express.urlencoded());

//cookieParser - middleware (стандартный ) - парсит cookie
app.use(express.cookieParser());

//connect.session - специальный middleware


app.use(require('./middleware/sendHttpError'));
//app.use(require('./middleware/loadUser'));



//router - middleware (стандартный ) - говорит какие запросы как будут обработаны
app.use(app.router);

// Подключаем маршруты к приложению
require('./routes')(app); // подключаем этот модуль и передаем ему app

//static - middleware (стандартный ) - если никакие раннее middleware не обработали запрос,
// то управление передается этому - смотрит если соотвутствующий файл в директории
app.use(express.static(path.join(__dirname, './public')));

    // Обработчик ошибок (express понимает т.к 4 аргумента)
    app.use(function(err, req, res, next) {
      if (typeof err == 'number') { // next(404);
        err = new HttpError(err); // делаем HttpError
      }
      // Если пришла HttpError
      if (err instanceof HttpError) {
        res.sendHttpError(err); // собств.метод - красиво отсылает ошибку
      } else {
        //
        if (app.get('env') == 'development') {
          //Специальный встроенный express-овский middleware
          // Для красивого вывода, обработка встроенным обработчиком express-а
          express.errorHandler()(err, req, res, next); //Отдаем запрос в явном виде(т.к иначе просто можно создать, но текущ запрос в него не попадет)
        }
        // Если не "development" - допустим "production"
        else {
          log.error(err); // записываем в log эту ошибку
          err = new HttpError(500); // выводим посетителю
          res.sendHttpError(err); // собств.метод - красиво отсылает ошибку
        }
      }
    });

//var User = require('./models/user').User;



var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log("Listening on " + port);
});


// Обновление настроек теста на СОКЕТАХ
io.on('connection', function(socket) {

  firebase.auth().onAuthStateChanged(user => {
    if (user) {

      // Для всех страниц кроме userTrainingSettings - дабы везде не тащить данные под него
      socket.on('message', function(data) {

        var refStudents = firebase.database().ref("students/" + data.userID);

        refStudents.once("value")
          .then(function(snapshot) {
            var currentTest = snapshot.child('current_test').val();

            //Формируем узлы с номерами тестов и соответствующими под-узлами
            var refNewTest = refStudents.child("tests/" + currentTest);

            var refNewTestSettings = refNewTest.child("/settings");
            var refNewTestManageButtons = refNewTest.child("/manage_buttons");
            var refNewTestPreTest = refNewTest.child("/pre_test");

            var refNewTestSettings = refNewTestSettings.update({
              text: data.text,
              sound: data.sound,
              swap: data.swap,
              swap_finger: data.swap_finger,
              swap_arrows: data.swap_arrows,
              progress_bar: data.progress_bar,
              btn_results: data.btn_results
            });

            var refNewTestManageButtons = refNewTestManageButtons.update({
              style_images_swap_arrows: data.style_images_swap_arrows,
              style_images_like_dislike: data.style_images_like_dislike,
              style_image_stop_test: data.style_image_stop_test,
              style_image_results: data.style_image_results,
              style_image_finish: data.style_image_finish
            });
            console.log(socket.id);
          });
      }) 

      // для userTrainingSettings
      socket.on('message_user_training', function(data) {

        var refStudents = firebase.database().ref("students/" + data.userID);

        refStudents.once("value")
          .then(function(snapshot) {
            var currentTest = snapshot.child('current_test').val();

            //Формируем узлы с номерами тестов и соответствующими под-узлами
            var refNewTest = refStudents.child("tests/" + currentTest);
            var refNewTestPreTest = refNewTest.child("/pre_test");

            var refNewTestPreTest = refNewTestPreTest.update({
              title_text_btn_back: data.title_text_btn_back,
              description_text_btn_back: data.description_text_btn_back,
              title_text_btn_like: data.title_text_btn_like,
              description_text_btn_like: data.description_text_btn_like,
              title_text_btn_stop: data.title_text_btn_stop,
              description_text_btn_stop: data.description_text_btn_stop,
              title_text_btn_next: data.title_text_btn_next,
              description_text_btn_next: data.description_text_btn_next,
              title_text_btn_dislike: data.title_text_btn_dislike,
              description_text_btn_dislike: data.description_text_btn_dislike
            });
            console.log(socket.id);
          });
      })

    }
  });
})


// Вешаем http сервер -> express будет обрабатывать все приходящие запросы
// http.createServer(app).listen(5000, function(){
//   console.log("START SERVER");
// });
