const express     = require('express');
const router      = express.Router();
const jsonfile    = require('jsonfile')
const config  = require('../modules/config-magic/config-magic.js').load('./server/config/config.json');

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
  res.render('test/config',{
    title: "Config",
    description: "",
    breadcrumb: ["home","config"],
    config_form: config.jsonToHtmlForm()
  });
});

router.post('/config',function(req, res){
  const body = req.body;

  config.formToJson(body, function(conf) {
    jsonfile.writeFile('./server/config/config.json', conf, {spaces: 2}, function (err) {
      console.error(err);
      if(!err) console.log('config succesfully updated');
      res.send('Config was saved. Please return to the homepage ( <a href="./home">Home<a> ) ');
    });
  });
});

module.exports = router;
