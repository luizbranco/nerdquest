// Generated by CoffeeScript 1.3.3
(function() {
  var addClues, addWorld, createCorrectPath, createWrongPath, getFriendClues, getMissions, getWorlds, setFirstWorld, setQuest, shuffleQuest;

  Array.prototype.shuffle = function() {
    return this.sort(function() {
      return 0.5 - Math.random();
    });
  };

  getMissions = function(json) {
    return json.shuffle();
  };

  getFriendClues = function(json) {
    return json.shuffle();
  };

  setQuest = function(missions) {
    var quest;
    quest = missions.pop();
    quest.worlds = [];
    return quest;
  };

  getWorlds = function(missions) {
    return missions.worlds = missions.map(function(mission) {
      return mission.world;
    });
  };

  addWorld = function(quest, world) {
    return quest.worlds.push(world);
  };

  shuffleQuest = function(quest) {
    var world, _i, _len, _ref;
    quest.worlds.shuffle();
    _ref = quest.worlds;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      world = _ref[_i];
      delete world.clues;
    }
    delete quest.shuffleQuest;
    return quest;
  };

  addClues = function(_arg) {
    var clues, previous_world, world;
    clues = _arg.clues, world = _arg.world, previous_world = _arg.previous_world;
    world.friend_clue = clues.pop();
    if (previous_world) {
      return world.world_clues = previous_world.clues.shuffle();
    }
  };

  setFirstWorld = function(quest, clues, previous_world) {
    var world;
    world = quest.world;
    delete quest.world;
    addClues({
      clues: clues,
      world: world,
      previous_world: previous_world
    });
    world.level = 0;
    return addWorld(quest, world);
  };

  createCorrectPath = function(_arg) {
    var clues, levels, missions, previous_world, quest, world;
    missions = _arg.missions, quest = _arg.quest, clues = _arg.clues, levels = _arg.levels;
    previous_world = void 0;
    while (levels > 0) {
      world = missions.worlds.pop();
      world.level = levels;
      addClues({
        clues: clues,
        world: world,
        previous_world: previous_world
      });
      previous_world = world;
      addWorld(quest, world);
      levels -= 1;
    }
    return setFirstWorld(quest, clues, previous_world);
  };

  createWrongPath = function(_arg) {
    var levels, missions, quest, times, world, _results;
    missions = _arg.missions, quest = _arg.quest, levels = _arg.levels;
    _results = [];
    while (levels > 0) {
      times = 2;
      while (times > 0) {
        world = missions.worlds.pop();
        world.level = levels;
        addWorld(quest, world);
        times -= 1;
      }
      _results.push(levels -= 1);
    }
    return _results;
  };

  exports.createQuestPath = function(_arg) {
    var clues, levels, missions, quest;
    levels = _arg.levels, missions = _arg.missions, clues = _arg.clues;
    missions = getMissions(missions);
    quest = setQuest(missions);
    getWorlds(missions);
    clues = getFriendClues(clues);
    createCorrectPath({
      missions: missions,
      quest: quest,
      clues: clues,
      levels: levels
    });
    createWrongPath({
      missions: missions,
      quest: quest,
      levels: levels
    });
    return shuffleQuest(quest);
  };

}).call(this);
