var blessed = require('blessed')
  , trakt = require('../trakt/requests')
  , content = require("./components/content-box")
  , main_menu = require("./components/main-menu");

var screen = require('./screen')();

var content_box = content();

content_box.append(main_menu(content_box));

screen.append(content_box);

screen.render();
