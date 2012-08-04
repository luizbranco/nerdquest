// Generated by CoffeeScript 1.3.3
(function() {

  Nerd.Quest = Backbone.RelationalModel.extend({
    relations: [
      {
        type: Backbone.HasMany,
        key: 'worlds',
        relatedModel: 'Nerd.World',
        collectionType: 'Nerd.Worlds',
        reverseRelation: {
          key: 'quest'
        }
      }, {
        type: Backbone.HasMany,
        key: 'suspects',
        relatedModel: 'Nerd.Suspect',
        collectionType: 'Nerd.Suspects',
        reverseRelation: {
          key: 'quest'
        }
      }
    ],
    start: function(callback) {
      this.timerStart = new Date();
      return this.get('worlds').start(callback);
    },
    finish: function() {
      this.timerEnd = new Date();
      this.stats();
      return this.trigger('finished');
    },
    increaseScore: function(n) {
      this.score = this.score + (n * this.scoreMultiplier);
      return this.scoreMultiplier += 1;
    },
    decreaseScore: function(n) {
      this.score = this.score - n;
      if (this.scoreMultiplier !== 0) {
        return this.scoreMultiplier -= 1;
      }
    },
    scoreRightWorld: function(level, callback) {
      var nextWorlds;
      this.increaseScore(300);
      this.rightWorlds += 1;
      nextWorlds = this.get('worlds').worldsByLevel(level + 1);
      if (nextWorlds.length === 0) {
        return this.trigger('finalLevel');
      } else {
        return callback(null, {
          nextWorlds: nextWorlds
        });
      }
    },
    scoreWrongWorld: function() {
      this.decreaseScore(800);
      return this.wrongWorlds += 1;
    },
    scoreRightSuspect: function() {
      return this.increaseScore(1000);
    },
    scoreWrongSuspect: function() {
      return this.increaseScore(2500);
    },
    useClue: function() {
      this.decreaseScore(300);
      return this.usedClues += 1;
    },
    duration: function() {
      var minutes, seconds, time;
      time = this.timerEnd - this.timerStart;
      seconds = parseInt(time / 1000);
      minutes = parseInt(time / 1000 / 60);
      return "" + minutes + ":" + seconds;
    },
    stats: function() {
      return this.set({
        score: this.score,
        rightWorlds: this.rightWorlds,
        wrongWorlds: this.wrongWorlds,
        usedClues: this.usedClues,
        duration: this.duration()
      });
    }
  });

  Nerd.Quests = Backbone.Collection.extend({
    model: Nerd.Quest,
    url: '/quests'
  });

}).call(this);
