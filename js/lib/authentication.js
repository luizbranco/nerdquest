// Generated by CoffeeScript 1.3.3
(function() {
  var app, base64url, db, facebook, findUser, getToken, qs;

  base64url = require('b64url');

  qs = require('querystring');

  app = require('../config').app;

  db = require('../lib/db');

  facebook = require('../lib/facebook');

  exports.url = "https://www.facebook.com/dialog/oauth?client_id=" + app.id + "&redirect_uri=" + app.canvas_url + "&scope=" + (app.scope.join(','));

  getToken = function(signed_request) {
    var data, encoded_data, json;
    try {
      encoded_data = signed_request.split('.', 2);
      json = base64url.decode(encoded_data[1]);
      data = JSON.parse(json);
      if (data.user_id) {
        return {
          id: data.user_id,
          token: data.oauth_token
        };
      }
    } catch (err) {
      return null;
    }
  };

  findUser = function(user) {
    return db.findUser(user.id, function(err) {
      if (err) {
        return facebook.getUser(user.token, function(id, data) {
          return db.saveUser(id, data);
        });
      }
    });
  };

  exports.user = function(signed_request, callback) {
    var user;
    user = getToken(signed_request);
    if (user) {
      findUser(user);
      return callback(null, user);
    } else {
      return callback('Invalid token');
    }
  };

}).call(this);
