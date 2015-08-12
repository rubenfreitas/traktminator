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
      // TODO Sync this
      // return Keychain.getPassword({
      //   account: 'default',
      //   service: 'gitter-cli'
      // });

      // Construct the promise instance.
      var deferred = q.defer();

      // Check if the session token already exists.
      if (configuration.token !== null) {
        // Resolve the promise with the existing token.
        return deferred.resolve(token);
      }

      // Read the json formatted file where the secrets settings lives.
      var secretsData = configuration._getSecrets();

      // Ensure that the secrets has an authentication-token attribute.
      if (!secretsData.hasOwnProperty('authentication-pin')) {
        deferred.reject(new Error('Secrets file has no authentication-pin.'));
      } else {
        // Set the configuration token.
        configuration.token = secretsData['authentication-pin'];

        // Resolve the promise with the token.
        deferred.resolve(configuration.token);
      }

      // Return the promise object.
      return deferred.promise;
    },

    /**
     * Set the token for the secrets file.
     *
     * @param {string} token
     * @return {void}
     */
    setToken: function (token) {
      // TODO Add this................
      // return Keychain.setPassword({
      //   account: 'default',
      //   service: 'gitter-cli',
      //   password: token
      // });
      // TODO end this................

      var deferred = q.defer();

      // Check if the token is correct.
      if (configuration.access._isTokenCorrect(token)) {
        // Ensure that the secrets file exists.
        if (!fs.existsSync(configuration.secretsFileLocation)) {
          fs.writeFileSync(configuration.secretsFileLocation, '{}');
        }

        // Save the token into the configuration attribute.
        configuration.token = token;

        // Get an object with the secrets content.
        var secretsData = configuration._getSecrets();

        // Set the configuration token on the data.
        secretsData['authentication-pin'] = token;

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
