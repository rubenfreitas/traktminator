var blessed = require('blessed');

exports = module.exports = function(context) {
    var box = blessed.box({
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'magenta',
        border: {
          fg: '#f0f0f0'
        },
        hover: {
          bg: 'green'
        }
      }
    });
    
    var title = blessed.text({
      content: 'takminator',
      clickable: false,
      align: 'center'
    });
    
    box.append(title);
    
    return box;
};
