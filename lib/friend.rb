module NerdQuest
  require 'koala'

  class Friend

    attr_reader :oauth_token, :data

    def initialize(oauth_token)
      @oauth_token = oauth_token
    end

    def find
      @data = random_friend.to_json
    end

    def clues
      # extract data
    end

    def random_friend
      friend = friends.sample
      graph.get_object(friend['id'])
    end

    def friends
      graph.get_connections('me', 'friends')
    end

    def graph
      (Koala.http_service.http_options[:ssl] ||= {})[:ca_path] = '/etc/ssl/certs'
      Koala::Facebook::API.new(oauth_token)
    end

  end

end
