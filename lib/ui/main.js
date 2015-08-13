var blessed = require('blessed')
  , request = require('request')
  , trakt = require('../trakt/api.js');

var screen = require('./screen')();

screen.key('s', function(ch, key) {
  screen.append(input);
});

// var list = blessed.list({
//   parent: screen,
//   width: '70%',
//   height: '40%',
//   top: 'center',
//   left: 'center',
//   align: 'center',
//   fg: 'white',
//   bg: 17,
//   selectedBg: 17,
//   selectedFg: 'red',
//   mouse: false,
//   keys: true,
//   vi: false
// });

// list.setItems([
//   'SEARCH',
//   'LATEST EPs',
//   'SERIE FAVS',
//   'MOVIE FAVS',
// ]);

var input = blessed.textarea({
    bottom: 0,
    height: 3,
    inputOnFocus: true,
    padding: {
        top: 1,
        left: 2
    },
    style: {
        fg: '#787878',
        bg: '#454545',

        focus: {
            fg: '#f6f6f6',
            bg: '#353535'
        }
    }
});

input.key('enter', function() {
  var pin = input.getValue();
  screen.remove(input);
  trakt.exchange_pin_for_acess_token(pin);

})

screen.render();
