module NerdQuest
  require 'json/ext'
  class MissionCreator

    MISSIONS_PATH = './data/missions.json'

    attr_reader :levels, :mission, :worlds

    # Creates a new constructor with a number
    # of levels (steps to reach the goal) and a list
    # of info from the user's friend
    def initialize(levels, friend_clues)
      @levels, @friend_clues = levels, friend_clues
      @mission = missions.slice!(0)
      @worlds = []
    end

    # Add the world as an array for the mission
    # and turn into a json to be saved/displayed
    def build
      erase_clues
      mission['worlds'] = worlds
      mission.to_json
    end

    # Creates a path with worlds that contains
    # clues from the user's friend and from
    # the next level's world
    def create_correct_path
      previous_world = nil
      final_world = true
      levels.downto(1) do |level|
        world = all_worlds.slice!(0)
        world['level'] = level
        add_clues(world, previous_world, final_world)
        final_world = false
        previous_world = world
        @worlds << world
      end
      set_first_world(previous_world)
    end

    # Creates a path with worlds that
    # doesn't add information for the
    # user, each level creates two worlds
    # like that
    def create_wrong_path
      levels.downto(1) do |level|
        2.times do
          world = all_worlds.slice!(0)
          world['level'] = level
          @worlds << world
        end
      end
    end

    # Shuffles and the worlds and places
    # inside a mission
    def shuffle_mission
      worlds.each do |world|
        world['places'].shuffle!
      end
      worlds.shuffle!
    end

    private

    def missions
      @missions ||= JSON.parse(File.read(MISSIONS_PATH)).shuffle!
    end

    def all_worlds
      @all_worlds ||= missions.map {|m| m['world']}.shuffle!
    end

    def friend_clues
      @friend_clues.shuffle!
    end

    def add_clues(world, previous_world, final_world)
      first_place = true
      places = world['places']
      places.each do |place|
        if first_place && final_world
          place['final'] = true
          first_place = false
        elsif first_place
          place['phrase'] = friend_clues.slice!(0)
          first_place = false
        elsif previous_world
          place['phrase'] = previous_world['clues'].shuffle!.slice!(0)
        end
      end
    end

    def set_first_world(previous_world)
      world = mission.delete('world')
      add_clues(world, previous_world, false)
      world['level'] = 0
      @worlds << world
    end

    def erase_clues
      worlds.each {|world| world.delete('clues')}
    end

  end
end
