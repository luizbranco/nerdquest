config = require('../config')
base64url = require('b64url')
db = require('../lib/db')

app = {
  id: '390782924297392'
  key: config.app.key
  canvas_url: 'https://apps.facebook.com/nerd_quest/'
  scope: ['friends_about_me', 'friends_activities', 'friends_birthday', 'friends_checkins',
          'friends_education_history', 'friends_events', 'friends_groups', 'friends_hometown',
          'friends_interests', 'friends_likes', 'friends_location', 'friends_relationships',
          'friends_religion_politics', 'friends_website', 'friends_work_history']
}

exports.url = "https://www.facebook.com/dialog/oauth?client_id=#{app.id}&redirect_uri=#{app.canvas_url}&scope=#{app.scope.join(',')}"

getToken = (signed_request) ->
  encoded_data = signed_request.split('.',2)
  json = base64url.decode(encoded_data[1])
  data = JSON.parse(json)
  {uid: data.user_id, token: data.oauth_token}

exports.user = (signed_request, callback) ->
  user = getToken(signed_request)
  db.findUser user._id, (err) ->
    if err
      facebook.getUser user._id, (user) ->
        db.newUser(user)
  callback(user)
