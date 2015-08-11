#!/usr/bin/env node

const tmenu = require('terminal-menu')
    , path = require('path')
    , http = require('http')
    , request = require('request')

var menu = tmenu({ width: 29, x: 4, y: 2, bg: 17 });

menu.reset();

menu.write('TRAKTMINATOR');
menu.write('-------------------------\n');

menu.add('TELL ME A STORY');

menu.on('select', function (label) {
    menu.close();
    console.log('\nSELECTED: ' + label);
    request({
      method: 'GET',
      url: 'https://private-anon-d06ab65ca-trakt.apiary-mock.com/comments/417',
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': '[client_id]'
      }}, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    });
});
process.stdin.pipe(menu.createStream()).pipe(process.stdout);

process.stdin.setRawMode(true);
menu.on('close', function () {
    process.stdin.setRawMode(false);
    process.stdin.end();
});
