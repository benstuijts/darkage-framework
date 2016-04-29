import Entity from './isometricEngine/Entity';
import Canvas from './isometricEngine/Canvas';
import Sockets from './isometricEngine/Sockets';
import Map from './isometricEngine/Map';

const game = Entity("playerMap").addComponents(
  Canvas("mainCanvas"),
  Sockets(socket),
  Map()
);

window.addEventListener("resize", function() {
  game.emit("resize");
});

game.print();
game.emit("loadMap", {startX: 0, startY:0, endX: 100, endY: 70});
game.print();

//const game = new Game(initFullScreenCanvas("mainCanvas"));

function initFullScreenCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  resizeCanvas(canvas);
  window.addEventListener("resize", function(){
    resizeCanvas(canvas);
  });
  return canvas;
}
function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  game && game.resize();
}

/*
import React from 'react';
import ReactDOM from 'react-dom';
import Window from './userinterface/Window';
import DialogBox from './userinterface/DialogBox';
import Gebouwen from './userinterface/gebouwen/Gebouwen';
import Inventory from './userinterface/inventory/Inventory';

import Settings from './userinterface/Settings/Settings';



console.log('entry point loaded as darkage.min.js __dirname = ' + __dirname);

const message = document.getElementById('message');
message.innerHTML = 'entry point loaded as darkage.min.js';

const listGroupItems = ["first thing", "second thing", "great thing", "special item!!!"];

class App extends React.Component {
  render() {
    return (
      <div>
        <Window title={'Inventory'} icon={'fa fa-shopping-bag'} items={listGroupItems}/>
      </div>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Settings />, document.getElementById('settings'));
ReactDOM.render(<Gebouwen />, document.getElementById('gebouwen'));
ReactDOM.render(<Inventory/>, document.getElementById('inventory'));
*/

