module.exports = function(app) {
  console.log('# game_routes loaded');

  app.get('/', function(req, res){
    res.send('<h1>Hello Darkage Framework!</h1>');
  });

};
