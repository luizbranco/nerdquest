// Generated by CoffeeScript 1.3.3
(function() {
  var app, auth, express, http, routes;

  express = require('express');

  routes = require('./routes');

  http = require('http');

  auth = require('./lib/authentication');

  app = express();

  app.configure(function() {
    app.set('port', process.env.PORT || 9393);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    return app.use(express["static"](__dirname + '/public'));
  });

  app.configure('development', function() {
    return app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  app.post('/', function(req, res) {
    var signed_request, token;
    signed_request = req.param('signed_request');
    if (signed_request) {
      token = auth.parse_signed_request(signed_request);
      return res.render('index', {
        token: token
      });
    } else {
      return res.render('index');
    }
  });

  http.createServer(app).listen(app.get('port'));

}).call(this);