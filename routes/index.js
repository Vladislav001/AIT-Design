var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
  // Каждый 'get' подключает соотсветсвующий модуль и вызывает его метод 'get'
  app.get('/', require('./login').get);
  app.post('/login', require('./login').post); // при poste на login, подключаем post этого модуля()
  app.get('/personalArea', require('./personalArea').get);
  app.get('/resultTest', checkAuth, require('./resultTest').get);
  app.get('/testSettings', checkAuth, require('./testSettings').get);
  app.get('/userTrainingSettings', checkAuth, require('./userTrainingSettings').get);
  app.get('/pre-resultSettings', checkAuth, require('./pre-resultSettings').get);
  app.get('/resultSettings', checkAuth, require('./resultSettings').get);
  app.get('/finishSettings', checkAuth, require('./finishSettings').get);

  app.post('/addNewUser', require('./addNewUser').post);
  app.post('/logout', require('./logout').post);

  //app.get('/getAllUsersInJSON', require('./getAllUsersInJSON').get);
};
