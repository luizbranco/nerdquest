// Generated by CoffeeScript 1.3.3
(function() {
  var clues, likeParser, parseInfo, parser;

  clues = [];

  likeParser = {
    'Musician/band': function(i) {
      return {
        type: 'music',
        phrase: "The suspect was listening to " + i
      };
    },
    'Movie': function(i) {
      return {
        type: 'movie',
        phrase: "The suspect dropped a movie ticket from " + i
      };
    },
    'Game/toys': function(i) {
      return {
        type: 'game',
        phrase: "The suspect invited me to play " + i
      };
    },
    'Tv show': function(i) {
      return {
        type: 'tv show',
        phrase: "The suspect told something about the last episode from " + i
      };
    },
    'Musical gender': function(i) {
      return {
        type: 'musical genre',
        phrase: "The suspect bet me at RockBand playing " + i
      };
    },
    'Sport': function(i) {
      return {
        type: 'sport',
        phrase: "The suspect practices " + i
      };
    },
    'Book': function(i) {
      return {
        type: 'book',
        phrase: "The suspect was carrying " + i
      };
    },
    'Writer': function(i) {
      return {
        type: 'writer',
        phrase: "The suspect was reading a book from " + i
      };
    },
    'App page': function(i) {
      return {
        type: 'app',
        phrase: "The suspect sent me an annoying invite from " + i
      };
    }
  };

  parser = {
    gender: function(i) {
      return clues.push({
        type: 'gender',
        phrase: "The suspect was " + i
      });
    },
    birthday: function(i) {
      var phrase, today, year, year_regex, years;
      phrase = '';
      year_regex = /\d\d\/\d\d\/\d\d\d\d/;
      if (i.match(year_regex)) {
        today = new Date;
        year = i.match(/\d\d\d\d/)[0];
        years = today.getFullYear() - parseInt(year);
        phrase = "The suspect was " + years + " years old";
      } else {
        phrase = "The suspect was born on " + i;
      }
      return clues.push({
        type: 'birthday',
        phrase: phrase
      });
    },
    hometown: function(i) {
      return clues.push({
        type: 'hometown',
        phrase: "The suspect was born in " + i.name
      });
    },
    location: function(i) {
      return clues.push({
        type: 'location',
        phrase: "The suspect lives in " + i.name
      });
    },
    significant_other: function(i) {
      return clues.push({
        type: 'In a relationship with',
        phrase: "The suspect showed me a few photos from " + i.name
      });
    },
    quotes: function(i) {
      return clues.push({
        type: 'quotes',
        phrase: "The suspect left this: '" + i + "'"
      });
    },
    political: function(i) {
      return clues.push({
        type: 'political',
        phrase: "The suspect has a " + i + " political view"
      });
    },
    religion: function(i) {
      return clues.push({
        type: 'religion',
        phrase: "The suspect believes in the " + i + " religion"
      });
    },
    education: function(i) {
      var item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = i.length; _i < _len; _i++) {
        item = i[_i];
        _results.push(clues.push({
          type: 'education',
          phrase: "The suspect has studied at " + item.school.name
        }));
      }
      return _results;
    },
    work: function(i) {
      var job, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = i.length; _i < _len; _i++) {
        job = i[_i];
        clues.push({
          type: 'work',
          phrase: "The suspect has worked at " + job.employer.name
        });
        if (job.position) {
          _results.push(clues.push({
            type: 'position',
            phrase: "The suspect has worked as " + job.position.name
          }));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    language: function(i) {
      var lang, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = i.length; _i < _len; _i++) {
        lang = i[_i];
        _results.push(clues.push({
          type: 'language',
          phrase: "I heard the suspect speaking " + lang.name
        }));
      }
      return _results;
    },
    sports: function(i) {
      var sport, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = i.length; _i < _len; _i++) {
        sport = i[_i];
        _results.push(clues.push({
          type: 'sports',
          phrase: "The suspect had invited me to " + sport.name
        }));
      }
      return _results;
    },
    favorite_teams: function(i) {
      var team, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = i.length; _i < _len; _i++) {
        team = i[_i];
        _results.push(clues.push({
          type: 'favorite teams',
          phrase: "The suspect was wearing a " + team.name + " shirt"
        }));
      }
      return _results;
    },
    favorite_athletes: function(i) {
      var athlete, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = i.length; _i < _len; _i++) {
        athlete = i[_i];
        _results.push(clues.push({
          type: 'favorite athletes',
          phrase: "The suspect has an autograph from " + athlete.name
        }));
      }
      return _results;
    },
    relationship_status: function(i) {
      var status;
      status = '';
      switch (i) {
        case 'Single':
          status = "The suspect looks single";
          break;
        case 'In a relationship':
          status = "I think the suspect is dating someone";
          break;
        case 'Engaged':
          status = "The suspect had a ring on his left hand";
          break;
        case 'Married':
          status = "The suspect had a ring on his right hand";
          break;
        case 'It\'s complidated':
          status = "The suspect seems to be in a complicated relationship";
          break;
        case 'In a open relationship':
          status = "The suspect is in a open relationship. If you know what I mean";
          break;
        case 'Widowed':
          status = "The suspect said being widowed";
          break;
        case 'Separated':
          status = "The suspect is separated";
          break;
        case 'Divorced':
          status = "The suspect is divorced";
      }
      return clues.push({
        type: 'relationship status',
        phrase: status
      });
    },
    likes: function(i) {
      var clue, like, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = i.length; _i < _len; _i++) {
        like = i[_i];
        if (likeParser.hasOwnProperty(like.category)) {
          clue = likeParser[like.category](like.name);
          _results.push(clues.push(clue));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  parseInfo = function(friend) {
    var k, v;
    clues = [];
    for (k in friend) {
      v = friend[k];
      if (parser.hasOwnProperty(k)) {
        parser[k](v);
      }
    }
    return clues;
  };

  exports.addClues = function(friend, callback) {
    var friend_clues;
    friend_clues = parseInfo(friend);
    return callback(friend_clues);
  };

}).call(this);
