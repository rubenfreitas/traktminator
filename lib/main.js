var program = require('commander')
  , commands = require('./commands');

// Define the program commands.
program.version(require('../package.json').version);

program
  .command('authentication')
  .alias('set-auth')
  .description('Set the access-key pin for client authentication.')
  .action(commands.authentication);

program
  .command('test-authentication')
  .alias('test-auth')
  .description('Test if access-key is up and running.')
  .action(commands.test_authentication);

// Parse the application arguments.
program.parse(process.argv);

// Check if there are no arguments.
if (!process.argv.slice(2).length) {
  // Check if app has oauth
  commands.validate_authentication(function(response) {
    if(response == '200') {
      require("./ui/main");
    } else {
      console.log('AUTHENTICATION FAILED');
    }
  })
}

// Check if there is a token on the arguments.
if (program.token) {
  commands.setToken(program.token);
}
