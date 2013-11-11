
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./server_data'),
  api = require('./server_data/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development onlyisLoggedIn
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */
app.get('/', routes.index);
//app.get('/partials/:name', routes.partials);

// JSON API

// user authentification
app.get('/api/auth', api.isRegistred);
app.get('/api/auth/login',api.isLoggedIn);
app.post('/api/auth/logout',api.logOut);
// projet crud
app.get('/api/projets', api.projets);

// employe crud
app.get('/api/employe/:id', api.employe);
app.post('/api/employe', api.addEmploye);
app.put('/api/employe/edit/:id', api.editEmploye);
app.delete('/api/employe/delete/:id', api.deleteEmploye);
app.get('/api/employes',api.employes);

// redirect all others to the index (HTML5 history)
//app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
