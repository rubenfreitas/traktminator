var blessed = require('blessed');

exports = module.exports = function(context) {
  var list = blessed.list({
    parent: screen,
    width: '70%',
    height: '40%',
    top: 'center',
    left: 'center',
    align: 'center',
    fg: 'white',
    bg: 17,
    selectedBg: 17,
    selectedFg: 'red',
    mouse: false,
    keys: true,
    vi: false
  });

  list.setItems([
    'SEARCH',
    'LATEST EPs',
    'SERIE FAVS',
    'MOVIE FAVS',
  ]);

  return list
}
