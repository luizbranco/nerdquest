# TODO add url when there is no signed_request
auth = require '../lib/authentication'

exports.index = (req, res) ->
  signed_request = req.param('signed_request')
  if signed_request
    auth.user signed_request, (err, user) ->
      unless err
        req.session.id = user.id
        req.session.token = user.token
        res.render('index')
  else
    res.render('index')
