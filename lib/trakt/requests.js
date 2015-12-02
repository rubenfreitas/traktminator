var request = require('request')
  , config = require('./config');

var baseRequest = request.defaults({
  baseUrl: config.getBaseURL(),
  headers: {
    'Content-Type': 'application/json'
  }
});

var searchRequest = baseRequest.defaults({
  headers: {
    'trakt-api-version': '2',
    'trakt-api-key': config.getClientID()
  },
  useQuerystring: true
});

var authRequest = baseRequest.defaults({
  headers: {
    'Authorization': 'Bearer ' + config.getAccessToken(),
    'trakt-api-version': '2',
    'trakt-api-key': config.getClientID()
  }
});

var requests = {

  exchange_pin_for_acess_token: function(pin, callback) {
    baseRequest.post({
      url: '/oauth/token',
      body: JSON.stringify({code: pin, client_id: config.getClientID(), client_secret: config.getClientSecret(),
        redirect_uri: config.getRedirectURI(), grant_type: 'authorization_code'})
    }, function (err, response, body) {
      if (err) {
        console.error('FAILED TO SET AUTHENTICATION:', err);
      }
      callback(JSON.parse(body));
    });
  },

  search: function(query, callback) {
    searchRequest({
      url: '/search',
      qs: query
    }, function (err, response, body) {
      if (err) {
        console.error('FAILED TO SEARCH:', err);
      }
      callback(response.statusCode);
    });
  },

  get_my_shows: function(callback) {
    authRequest({
      url: '/calendars/my/shows/'
    }, function (err, response, body) {
      if (err) {
        console.error('FAILED TO TEST:', err);
      }
      callback(response.statusCode);
    });
  }

}

exports = module.exports = requests;
