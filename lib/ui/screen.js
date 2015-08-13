var blessed = require('blessed')
  , path = require('path');

exports = module.exports = function () {
  // Create the screen object.
  var screen = blessed.screen({
    title: 'traktminator',
    autoPadding: true,
    smartCSR: true,
    useBCE: true,
    cursor: {
      artificial: true,
      blink: true,
      shape: 'line'
    },
    log: path.join(__dirname, '..', '..', 'traktminator.log'),
    dump: true,
    fullUnicode: true,
    dockBorders: true,
    ignoreLocked: ['C-c']
  });

  screen.key('q', function(ch, key) {
    return process.exit(0);
  });

  return screen;
};
