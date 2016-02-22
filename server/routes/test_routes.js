var config = {

  "app": {
    "name"    : "darkage",
    "version" : "1.0.0",
    "author"  : "Ben Stuijts 2016"
  },

  "database" : {
    "name"    : "mongoDb"
  }

};

var fs          = require('fs');
var express     = require('express');
var router        = express.Router();

var routes = [
  "worldmap",
  "config"
];

console.log('# test_routes loaded');

router.get('/',function(req,res){
  res.redirect('test/home');
});

router.get('/home', function(req,res){
  res.render('test/index',{
    title: "All routes",
    description: "",
    routes: routes,
    breadcrumb: ["home"]
  });
});

router.get('/worldmap', function(req, res){
  res.render('test/worldmap',{
    title: "Worldmap",
    description: "",
    breadcrumb: ["home","worldmap"]

  });
});

router.get('/config', function(req, res){
  var html = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';

      html+= "<h1>test/config</h1>";
      html+= '<form method="post" action="/test/config">';
  for(option in config) {
    html += "<h2>" + option + "</h2>";
    console.dir(option);

    for(property in config[option]) {
      switch(typeof property) {
        case "string":
          html += "<label>"+property+"<label>";
          html += '<input type="text" value="'+config[option][property]+'" name="'+option+'.'+property+'">';
          html += '<br>';
        break;
        case "number":
        break;
      }
    }
  }
  html += '<button type="submit">Save configuration</button>';
  html += '</form>';
  res.send(html);
});

module.exports = router;

/*
module.exports = function(app) {
  console.log('test routes loaded...');



  app.get('/test/config', function(req, res){
    var html = "<h1>test/config</h1>";
        html+= '<form method="post" action="/test/config">';
    for(option in config) {
      html += "<h2>" + option + "</h2>";
      console.dir(option);

      for(property in config[option]) {
        switch(typeof property) {
          case "string":
            html += "<label>"+property+"<label>";
            html += '<input type="text" value="'+config[option][property]+'" name="'+option+'.'+property+'">';
            html += '<br>';
          break;
          case "number":
          break;
        }
      }
    }
    html += '<button type="submit">Save configuration</button>';
    html += '</form>';
    res.send(html);
  });

  app.post('/test/config', function(req,res){
    console.log('post received...');
    const body = req.body;
    console.log(body);

    var outputFilename = './config.json';

    // werkt wel, echter in de body is niet de indeling van de config file aangehouden...

    fs.writeFile(outputFilename, JSON.stringify(body, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
});

  });


};
*/
