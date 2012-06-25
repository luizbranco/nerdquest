// Generated by CoffeeScript 1.3.3
(function() {
  var a, addClues, addWorld, b, build, c, createCorrectPath, createNewMission, createWrongPath, d, fs, getFriendClues, getMissions, setFirstWorld, setMission;

  fs = require('fs');

  Array.prototype.shuffle = function() {
    return this.sort(function() {
      return 0.5 - Math.random();
    });
  };

  getMissions = function(json) {
    var missions;
    missions = json.shuffle();
    missions.worlds = missions.map(function(mission) {
      return mission.world;
    });
    return missions;
  };

  getFriendClues = function(json) {
    return json.shuffle();
  };

  setMission = function(missions) {
    var mission;
    mission = missions.pop();
    mission.worlds = [];
    return mission;
  };

  addWorld = function(mission, world) {
    return mission.worlds.push(world);
  };

  build = function(mission) {
    var world, _i, _len, _ref, _results;
    mission.worlds.shuffle();
    _ref = mission.worlds;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      world = _ref[_i];
      delete world.clues;
      world.places.shuffle();
      _results.push(delete mission.build);
    }
    return _results;
  };

  addClues = function(clues, world, previous_world, final_world) {
    var clue, first_place, place, _i, _len, _ref, _results;
    first_place = true;
    _ref = world.places;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      place = _ref[_i];
      if (first_place && final_world) {
        place.final = true;
        _results.push(first_place = false);
      } else if (first_place) {
        clue = clues.pop();
        place.phrase = clue.phrase;
        place.type = clue.type;
        _results.push(first_place = false);
      } else if (previous_world) {
        place.phrase = previous_world.clues.shuffle().pop();
        _results.push(place.type = 'world');
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  setFirstWorld = function(mission, clues, previous_world) {
    var world;
    world = mission.world;
    delete mission.world;
    addClues(clues, world, previous_world);
    world.level = 0;
    return addWorld(mission, world);
  };

  createCorrectPath = function(missions, mission, clues, levels) {
    var final_world, previous_world, world, _results;
    previous_world = void 0;
    final_world = true;
    _results = [];
    while (levels > 0) {
      world = missions.worlds.pop();
      world.level = levels;
      addClues(clues, world, previous_world, final_world);
      final_world = false;
      previous_world = world;
      addWorld(mission, world);
      _results.push(levels--);
    }
    return _results;
  };

  createWrongPath = function(missions, mission, levels) {
    var times, world, _results;
    _results = [];
    while (levels > 0) {
      times = 2;
      while (times > 0) {
        world = missions.worlds.pop();
        world.level = levels;
        addWorld(mission, world);
        times--;
      }
      _results.push(levels--);
    }
    return _results;
  };

  createNewMission = function(levels, missions_json, clues_json) {
    var clues, mission, missions;
    missions = getMissions(missions_json);
    mission = setMission(missions);
    console.log(mission);
    clues = getFriendClues(clues_json);
    createCorrectPath(missions, mission, clues, 2);
    createWrongPath(missions, mission, 2);
    return console.log(mission);
  };

  a = fs.readFileSync('./spec/data/missions.json');

  b = fs.readFileSync('./spec/data/friend.json');

  c = JSON.parse(a);

  d = JSON.parse(b).clues;

  createNewMission(2, c, d);

}).call(this);