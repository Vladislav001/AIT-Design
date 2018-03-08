var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
  // Каждый 'get' подключает соотсветсвующий модуль и вызывает его метод 'get'
  app.get('/', require('./login').get);
  app.post('/login', require('./login').post); // при poste на login, подключаем post этого модуля()
  app.post('/logout', require('./logout').post);
  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);
  app.get('/personalArea', require('./personalArea').get);

  app.get('/result_test/id:idTag', checkAuth, require('./resultTest').get);
  app.post('/result_test/id:idTag', require('./resultTest').post); // Обновление данных студента

app.get('/result_test/id:idTag/graphs', checkAuth, require('./resultTestGraphs').get);

  app.get('/:currentTest/test_settings/id:idTag', checkAuth, require('./testSettings').get);

  app.get('/:currentTest/user_training_settings/id:idTag', checkAuth, require('./userTrainingSettings').get);
  app.get('/:currentTest/pre_result_settings/id:idTag', checkAuth, require('./pre-resultSettings').get);
  app.get('/:currentTest/result_settings/id:idTag', checkAuth, require('./resultSettings').get);
  app.get('/:currentTest/finish_settings/id:idTag', checkAuth, require('./finishSettings').get);

  app.post('/addNewUser', require('./addNewUser').post);
    // Т.к перенес на сокеты - пока не нужно
  // app.post('/updateTestSettings/id:idTag', require('./testSettings').post);
  // app.post('/updateUserTrainingSettings/id:idTag', require('./userTrainingSettings').post);
  // app.post('/updatePre-ResultSettings/id:idTag', require('./pre-resultSettings').post);
  // app.post('/updateResultSettings/id:idTag', require('./resultSettings').post);
  // app.post('/updateFinishSettingsSettings/id:idTag', require('./finishSettings').post);

  app.post('/deleteStudent/id:idTag', require('./deleteStudent').post);
  app.get('/restorePassword', require('./restorePassword').get);
  app.post('/restorePassword', require('./restorePassword').post);

  // Информация о тренере
  app.get('/coach/id:idTag', checkAuth, require('./profileCoach').get);
  // app.post('/deleteCoach/id:idTag', require('./deleteCoach').post);


};
