auth = require '../lib/authentication'

exports.index = (req, res) ->
  signed_request = req.param('signed_request')
  if signed_request
    token = auth.getToken(signed_request)
    res.cookie('token', token)
    res.render 'index'
  else
    res.render 'index'
