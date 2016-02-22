const jsonfile    = require('jsonfile');

module.exports = {
  config: null,
  load: function(url){
    this.config = jsonfile.readFileSync(url);
    return this;
  },
  write: function(){
    
  },
  jsonToHtmlForm: function(obj) {
    if(!obj && this.config) obj = this.config;
    var response = "";
    var depth = 0;
    destructure(obj);

    function destructure(obj, previousBranche) {
      for(branche in obj) {
        depth = 0;
        if(!previousBranche) previousBranche = '';
        if(typeof obj[branche] == 'object') {
          depth++;
          if(depth == 1) {
            response += '<h2>' + branche + '</h2>';
          } else {
            response += '<label>' + branche + ' - </label>';
          }

          //response += '</div>';
          if(!previousBranche) { var previous = branche; } else {
            var previous = previousBranche + '.' + branche;
          }

          destructure(obj[branche], previous);
        }
        if(typeof obj[branche] == 'string') {
          response += '<div class="form-group">';
          response += '<label>' + branche + '</label>';
          response += '<input class="form-control" type="text" value="'+obj[branche]+'" name="'+previousBranche+'.'+branche+'">';
          response += '</div>';
        }
        if(typeof obj[branche] == 'boolean') {
          response += '<div class="form-group">';
          response += '<label>' + branche + '(boolean)</label>';
          response += '<input class="form-control" type="text" value="'+obj[branche]+'" name="'+previousBranche+'.'+branche+'">';
          response += '</div>';
        }
      }
    }
    return response;
  },
  formToJson: function(body, callback) {
    var conf = {};
    for (data in body) {
      var br = data.split('.');
      if(br.length == 2) {
        if(!conf[br[0]]) {
          conf[br[0]] = {};
        }
        conf[br[0]][br[1]] = body[data];
      }
      if(br.length == 3) {
        if(!conf[br[0]]) {
          conf[br[0]] = {};
        }
        if(!conf[br[0]][br[1]]) {
          conf[br[0]][br[1]] = {};
        }
        conf[br[0]][br[1]][br[2]] = body[data];
      }
    }
    callback(conf);
  }
};
