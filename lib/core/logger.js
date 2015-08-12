const winston = require('winston');

var logger = new (Winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'traktminator.log'
    })
  ]
});

exports = module.exports = logger;
