const Winston = require('winston');

var logger = new (Winston.Logger)({
  transports: [
    new (Winston.transports.File)({
      filename: 'traktminator.log'
    })
  ]
});

exports = module.exports = logger;