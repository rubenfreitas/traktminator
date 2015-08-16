var request = require('request')
  , url = require('url')
  , access_config = require('../core/configuration').access;

var configuration = {

  getAccessToken: function() {
    return access_config.getToken();
  },

  getBaseURL: function() {
    return 'https://api-v2launch.trakt.tv/';
  },

  getClientID: function() {
    return 'bc8d96edbf9428d80a337f26624a983200b8f03bfa2e79eb15b9c3475fd2ac59';
  },

  getClientSecret: function() {
    return 'c35722ada0711abd77dffd7564324c6576b0268d26ed11bc4430fc63183f657b';
  },

  getRedirectURI: function () {
    return 'urn:ietf:wg:oauth:2.0:oob';
  }

}

exports = module.exports = configuration;
