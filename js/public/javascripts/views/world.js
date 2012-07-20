// Generated by CoffeeScript 1.3.3
(function() {

  Nerd.WorldView = Backbone.View.extend({
    tagName: 'section',
    className: 'world',
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#world-template').html());
      this.render();
      return this.renderClues();
    },
    render: function() {
      var $worldCanvas, rendered;
      $worldCanvas = $('.world-canvas');
      rendered = this.template(this.model.toJSON());
      $(this.el).html(rendered);
      $worldCanvas.html(this.el);
      return this;
    },
    renderClues: function() {
      var nextClues;
      nextClues = this.model.get('nextClues');
      return new Nerd.CluesView({
        collection: nextClues
      });
    }
  });

  Nerd.WorldListView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      _.bindAll(this, 'render');
      return this.template = _.template($('#world-row-template').html());
    },
    events: function() {
      return {
        'click': 'selectWorld'
      };
    },
    render: function() {
      var rendered;
      rendered = this.template(this.model.toJSON());
      $(this.el).html(rendered);
      return this;
    },
    selectWorld: function() {
      var _this = this;
      return this.model.isRight(function(err, result) {
        var nextWorlds;
        if (err) {
          _this.undelegateEvents();
          return $(_this.el).addClass('wrong');
        } else {
          $(_this.el).addClass('right');
          new Nerd.WorldView({
            model: _this.model
          });
          nextWorlds = new Nerd.Worlds(result.nextWorlds);
          return new Nerd.WorldsListView({
            collection: nextWorlds
          });
        }
      });
    }
  });

  Nerd.WorldsListView = Backbone.View.extend({
    className: 'next-worlds',
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#worlds-list-template').html());
      this.collection.bind('reset', this.render);
      return this.render();
    },
    render: function() {
      var $world, $worlds;
      $world = $('section.world');
      $(this.el).html(this.template({}));
      $worlds = this.$('.worlds');
      this.collection.each(function(world) {
        var view;
        view = new Nerd.WorldListView({
          model: world,
          collection: this.collection
        });
        return $worlds.append(view.render().el);
      });
      $world.append(this.el);
      return this;
    }
  });

}).call(this);
