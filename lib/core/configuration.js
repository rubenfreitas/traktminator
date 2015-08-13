var fs = require('fs')
  , Path = require('path')
  , q = require('q');

var configuration = {
  secretsFileLocation: Path.join(__dirname, 'secrets.json'),

  /**
  * Load the secrets file. `fs.readFile` wrapper.
  *
  * @param {function} callback.
  * @return {function}
  */
  _loadSecrets: function (callback) {
    return fs.readFile(configuration.secretsFileLocation, {encoding: 'utf8'}, callback);
  },

  /**
  * Synchronously load the secrets file.
  *
  * @return {string}
  */
  _loadSecretsSync: function () {
    return fs.readFileSync(configuration.secretsFileLocation, {encoding: 'utf8'});
  },

  /**
  * Get the contents of the secret file.
  *
  * @return {object}
  */
  _getSecrets: function () {
    try {
      return JSON.parse(configuration._loadSecretsSync());
    } catch (error) {
      return {};
    }
  },

  /**
   * Store the current session token.
   *
   * @static
   */
  token: null,

  access: {
    /**
     * TODO Needs to be implemented.
     * Check if token is correct.
     *
     * @private
     * @param {String} token.
     * @return {boolean}
     */
    _isTokenCorrect: function (token) {
      return true;
    },

    /**
     * Get the token from the secrets file.
     *
     * @return {promise}
     */
    getToken: function () {

      // Construct the promise instance.
      var deferred = q.defer();

      // Check if the session token already exists.
      if (configuration.token !== null) {
        // Resolve the promise with the existing token.
        return deferred.resolve(token);
      }

      // Read the json formatted file where the secrets settings lives.
      var secretsData = configuration._getSecrets();

      // Ensure that the secrets has an access-token attribute.
      if (!secretsData.hasOwnProperty('access-token')) {
        deferred.reject(new Error('Secrets file has no access-token.'));
      } else {
        // Set the configuration token.
        configuration.token = secretsData['access-token'];

        // Resolve the promise with the token.
        deferred.resolve(configuration.token);
      }

      // Return the promise object.
      return deferred.promise;
    },

    setToken: function (response) {

      // Construct the promise instance.
      var deferred = q.defer();

      // Check if the token is correct.
      if (configuration.access._isTokenCorrect(response)) {
        // Ensure that the secrets file exists.
        if (!fs.existsSync(configuration.secretsFileLocation)) {
          fs.writeFileSync(configuration.secretsFileLocation, '{}');
        }

        // Save the token into the configuration attribute.
        configuration.token = response.access_token;

        // Get an object with the secrets content.
        var secretsData = configuration._getSecrets();

        // Set the configuration token on the data.
        secretsData['access-token'] = response.access_token;
        secretsData['refresh_token'] = response.refresh_token;
        secretsData['token_type'] = response.token_type;
        secretsData['expires_in'] = response.expires_in;
        secretsData['aquired_in'] = new Date();

        var data = JSON.stringify(secretsData, null, 2);

        // Update the secrets file with the upadted token.
        fs.writeFile(configuration.secretsFileLocation, data, function (err) {
          if (err) deferred.reject(err);

          // Resolve the promise.
          deferred.resolve();
        });
      } else {
        // Reject the promise with "Invalid token" error.
        deferred.reject(new Error('Invalid token.'));
      }

      // Return the promise.
      return deferred.promise;
    }
  }

}

exports = module.exports = configuration;
