var q = require('q')
  , chalk = require('chalk')
  , trakt_api = require('./trakt/requests');

var configuration = require('./core/configuration');

var commands = {

  /**
   * Authorize a token or display a message to informe
   * the user how to get it.
   *
   * @param {string} token
   * @return {void}
   */
  authentication: function (token) {

    if (typeof token === 'string') {
      // Set the token based on the user input.

      trakt_api.exchange_pin_for_acess_token(token, function (response){
        configuration.access.setToken(response).catch(function () {
          // Or if the token is not correct, display an error.
          console.log('\n%s\n', chalk.red('The token is not correct/valid.'));
        });
      });

      // Stop the execution of the method.
      return undefined;

    }

    // Display the "Go to url" message with the instructions on the screen.
    console.log('\nLog in at %s to get your access token.',
      chalk.blue('https://trakt.tv/pin/5820')
    );
    console.log('Then, copy your %s and run:\n', chalk.bold('PIN'));
    console.log('    %s %s',
      chalk.bold('traktminator authorize'),
      chalk.bold(chalk.green('paste-your-pin-here'))
    );
    console.log(chalk.dim(
      '\n\nVisit the repository to know what\'s happening behind the scenes:',
      chalk.blue('\nhttps://github.com/rubenfreitas/traktminator')
    ));
  },

  /**
   * Test if access-token is defined and valid
   *
   * @param
   * @return {void}
   */
  test_authentication: function () {
    trakt_api.get_my_shows(function (response){
        console.log(response == '200' ? 'READY 2 ROCK!' : 'CRAP! STH WRONG', ': RESPONSE CODE -> ', response);
    });
  },

  /**
   * Validate access-token
   *
   * @param
   * @return {void}
   */
  validate_authentication: function (callback) {
    trakt_api.get_my_shows(function (response){
        callback(response);
    });
  }

}

exports = module.exports = commands;
