const blessed = require('blessed')
    , request = require('request');

var screen = require('./screen')();

screen.key('q', function(ch, key) {
  return process.exit(0);
});

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
  screen.remove(input);
  request({
      method: 'GET',
      url: 'https://private-anon-4d52955c5-trakt.apiary-mock.com/search?query=batman&type=type&year=2015',
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': '[client_id]'
      }}, function (error, response, body) {
        console.log('\nStatus:', response.statusCode);
      //console.log('Headers:', JSON.stringify(response.headers));
      //console.log('Response:', body);
  });
})

screen.render();