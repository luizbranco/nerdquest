// Generated by CoffeeScript 1.3.3
(function() {

  Nerd.Quest = Backbone.Model.extend({
    start: function() {
      return console.log('starting');
    }
  });

  Nerd.Quests = Backbone.Collection.extend({
    model: Nerd.Quest,
    url: '/quests'
  });

}).call(this);