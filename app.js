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
var ref = firebase.app().database().ref();

// Создать приложение (создает функцию, чтобы обрабатывать запросы)
var app = express();

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

app.get("/result_test/id:idTag", function(req, res, next) {


console.log(req.params.idTag + " req.params.idTag");
  // ищем окумент в коллекции юзеров по данному id
  // User.findById(req.params.idTag, function(err, user) {
  //   if (err) return next(err);
  //
  //   // рисуем профиль юзера с данными из его документа
  //   res.render("resultTest", {
  //     EMAIL: user.email,
  //   });
  // });

});







// Вешаем http сервер -> express будет обрабатывать все приходящие запросы
http.createServer(app).listen(5000, function(){
  console.log("START SERVER");
});
