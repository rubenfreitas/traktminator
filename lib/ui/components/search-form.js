var blessed = require('blessed');

exports = module.exports = function(context) {
  var searchForm = blessed.textarea({
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

  searchForm.key('enter', function() {
    var pin = input.getValue();
    context.remove(input);
    //TODO: implement action
  })

  return searchForm;
};
