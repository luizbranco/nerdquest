module NerdQuest
  require 'koala'
  require_relative 'clue'

  class Friend

    attr_reader :oauth_token

    def initialize(oauth_token)
      @oauth_token = oauth_token
    end

    def find
      friend = friends.sample
      info = batch_request(friend['id'])
      {
        'id' => info.first['id'],
        'name' => info.first['name'],
        'clues' => clues(info[0],info[1])
      }
    end

    def clues(info, likes)
      Clue.new(info, likes).extract
    end

    def batch_request(id)
      graph.batch do |g|
        g.get_object(id)
        g.get_connections(id, "likes")
      end
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
