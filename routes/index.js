//var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {
  // Каждый 'get' подключает соотсветсвующий модуль и вызывает его метод 'get'
  app.get('/', require('./login').get);
  app.post('/login', require('./login').post); // при poste на login, подключаем post этого модуля()
  app.get('/personalArea', require('./personalArea').get);
  app.get('/resultTest', require('./resultTest').get);
  app.get('/testSettings', require('./testSettings').get);
  app.get('/userTrainingSettings', require('./userTrainingSettings').get);
  app.get('/pre-resultSettings', require('./pre-resultSettings').get);
  app.get('/resultSettings', require('./resultSettings').get);
  app.get('/finishSettings', require('./finishSettings').get);
};
 
