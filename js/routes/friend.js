// Generated by CoffeeScript 1.3.3
(function() {
  var facebook;

  facebook = require('../lib/facebook');

  exports.index = function(req, res) {
    var token;
    token = req.session.token;
    return facebook.getFriend(token, function(friend, suspects) {
      return res.send({
        friend: friend,
        suspects: suspects
      });
    });
  };

}).call(this);
