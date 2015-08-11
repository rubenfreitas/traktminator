#!/usr/bin/env node

const blessed = require('blessed')
    , request = require('request');

var screen = blessed.screen();
var list = blessed.list({
  parent: screen,
  width: '50%',
  height: '50%',
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

list.select(0);

screen.key('q', function(ch, key) {
  return process.exit(0);
});

screen.render();
