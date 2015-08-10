#!/usr/bin/env node

const tmenu = require('terminal-menu')
    , path = require('path')

var menu = tmenu({ width: 29, x: 4, y: 2 });

menu.reset();

menu.write('TRAKTMINATOR');
menu.write('-------------------------\n');

menu.add('TELL ME A STORY');

menu.on('select', function (label) {
    menu.close();
    console.log('\nSELECTED: ' + label);
});
process.stdin.pipe(menu.createStream()).pipe(process.stdout);

process.stdin.setRawMode(true);
menu.on('close', function () {
    process.stdin.setRawMode(false);
    process.stdin.end();
});
