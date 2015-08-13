var program = require('commander');
var commands = require('./commands');

// Define the program commands.
program.version(require('../package.json').version);

program
  .command('authorize')
  .alias('set-auth')
  .description('Set the access-key pin for client authentication.')
  .action(commands.authorize);

program.option('--pin [pin]', 'Set the access-key pin for client authentication. This won\'t be persisted.');

// Parse the application arguments.
program.parse(process.argv);

// Check if there are no arguments.
if (!process.argv.slice(2).length) {
  // Check if app has oauth
  console.log('NOT AUTHENTICATED');
  require("./ui/main");
}

// Check if there is a token on the arguments.
if (program.token) {
  commands.setToken(program.token);
}
