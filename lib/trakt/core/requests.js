var request = require('request');

const BASE_URL = 'https://api-v2launch.trakt.tv/'
    , CLIENT_ID = 'bc8d96edbf9428d80a337f26624a983200b8f03bfa2e79eb15b9c3475fd2ac59'
    , CLIENT_SECRET = 'c35722ada0711abd77dffd7564324c6576b0268d26ed11bc4430fc63183f657b'
    , REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';


var requests = {
    exchange_pin_for_acess_token: function(pin){
        request({
          method: 'POST',
          url: BASE_URL + '/oauth/token',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({code: pin, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: REDIRECT_URI, grant_type: 'authorization_code'})
        }, function (error, response, body) {
            //TODO: HANDLLING: STORE KEYS OR LOG ERROR
          console.log('Status:', response.statusCode);
          console.log('Headers:', JSON.stringify(response.headers));
          console.log('Response:', body);
        });
    }
}

exports = module.exports = requests;