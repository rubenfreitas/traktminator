var request = require('request')
  , configuration = require('../../core/configuration');

const BASE_URL = 'https://api-v2launch.trakt.tv/'
    , CLIENT_ID = 'bc8d96edbf9428d80a337f26624a983200b8f03bfa2e79eb15b9c3475fd2ac59'
    , CLIENT_SECRET = 'c35722ada0711abd77dffd7564324c6576b0268d26ed11bc4430fc63183f657b'
    , REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob'
    , ACCESS_TOKEN = configuration.access.getToken();

var requests = {
    exchange_pin_for_acess_token: function(pin, callback) {
        request({
          method: 'POST',
          url: BASE_URL + '/oauth/token',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({code: pin, client_id: CLIENT_ID, client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI, grant_type: 'authorization_code'})
        }, function (error, response, body) {
          if (error) {
            console.error('FAILED TO AUTHENTICATE:', err);
          }
          callback(JSON.parse(body));
        });
    },

    test_acess_token: function(callback) {
        request({
          method: 'GET',
          url: 'https://api-v2launch.trakt.tv/calendars/my/shows/',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + ACCESS_TOKEN,
            'trakt-api-version': '2',
            'trakt-api-key': CLIENT_ID
          }
        }, function (error, response, body) {
          if (error) {
            console.error('FAILED TO TEST:', err);
          }
          callback(response.statusCode);
        });
    }

}

exports = module.exports = requests;
