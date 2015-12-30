var blessed = require('blessed');

exports = module.exports = function(parent) {
  var main_menu = blessed.list({
    parent: parent,
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

  main_menu.setItems([
    'SEARCH',
    'LATEST EPs',
    'SERIE FAVS',
    'MOVIE FAVS',
  ]);
  
  main_menu.select('0', function() {
    console.log("you wish");
  parent.render();
});
    
  return main_menu
}
