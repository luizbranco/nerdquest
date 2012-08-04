// Generated by CoffeeScript 1.3.3
(function() {
  var Quest, addClues, addWorld, createCorrectPath, createWrongPath, getWorlds, shuffleQuest, _;

  _ = require('underscore');

  Quest = function() {
    return {
      score: 0,
      duration: 0,
      scoreMultiplier: 10,
      usedClues: 0,
      rightWorlds: 0,
      wrongWorlds: 0,
      timerStart: 0,
      timerEnd: 0,
      worlds: []
    };
  };

  getWorlds = function(json) {
    return _.shuffle(json);
  };

  addWorld = function(quest, world) {
    return quest.worlds.push(world);
  };

  shuffleQuest = function(quest) {
    var world, _i, _len, _ref;
    quest.worlds = _.shuffle(quest.worlds);
    _ref = quest.worlds;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      world = _ref[_i];
      delete world.clues;
    }
    return quest;
  };

  addClues = function(_arg) {
    var previous_world, world;
    world = _arg.world, previous_world = _arg.previous_world;
    return world.nextClues = _.shuffle(previous_world.clues);
  };

  createCorrectPath = function(_arg) {
    var levels, previous_world, quest, world, worlds, _results;
    worlds = _arg.worlds, quest = _arg.quest, levels = _arg.levels;
    previous_world = void 0;
    _results = [];
    while (levels >= 0) {
      world = worlds.pop();
      world.level = levels;
      if (previous_world) {
        addClues({
          world: world,
          previous_world: previous_world
        });
      } else {
        world.final = true;
      }
      previous_world = world;
      addWorld(quest, world);
      _results.push(levels -= 1);
    }
    return _results;
  };

  createWrongPath = function(_arg) {
    var levels, quest, times, world, worlds, _results;
    worlds = _arg.worlds, quest = _arg.quest, levels = _arg.levels;
    _results = [];
    while (levels > 0) {
      times = 2;
      while (times > 0) {
        world = worlds.pop();
        world.level = levels;
        addWorld(quest, world);
        delete world.clues;
        times -= 1;
      }
      _results.push(levels -= 1);
    }
    return _results;
  };

  exports.createQuestPath = function(_arg) {
    var levels, quest, worlds;
    levels = _arg.levels, worlds = _arg.worlds;
    quest = new Quest();
    worlds = getWorlds(worlds);
    createCorrectPath({
      worlds: worlds,
      quest: quest,
      levels: levels
    });
    createWrongPath({
      worlds: worlds,
      quest: quest,
      levels: levels
    });
    return shuffleQuest(quest);
  };

}).call(this);
