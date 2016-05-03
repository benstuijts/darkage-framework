//import Entity from './isometricEngine/Entity';
//import Canvas from './isometricEngine/Canvas';
//import Viewport from './isometricEngine/Viewport';
//import LayerManager from './isometricEngine/LayerManager';
//import Sockets from './isometricEngine/Sockets';
//import Map from './isometricEngine/Map';
//import Render from './isometricEngine/Render';

//import IsometricTileLayer from './isometricEngine/IsometricTileLayer';

/* Game Component System v1 */

/* 
  Game is an entity (reference to a number), #1236
  The entity has components which holds it's data:
    health: { hp: 10, hpMax: 20 },
    position: {x: 3, y: 7}
  
  The system controls the entities and their components
  move() {
    entities.forEach() {
      
      component['position'] => x: newXpostion, y: newYposition
      if(#1236.component.position) #1236.component.position.x = newXPosition;
      
    }
  }
  
  scroll() {
    #component.position.x += deltaX;
    (hier regel je dus de positie in een isometrisch grid)
    (alleen de positie van de entity wijzigen)
  }
  
  render() {
  
    if(#1236.component.position && ...renderable && ...graphic &&...canvas) {
      ctx = #1236.component.canvas.ctx;
      position = #1236...x, y
      graphic = #1236...graphic.currentImage
      ctx.drawImage(graphic, position);
      
    }
    (alleen de entities tekenen op een canvas)
  }

*/

//game.print();

window.game = game;
/* Game Entity Components
  Map
  Canvas
  LayerManager: draw every layer, methods draw, add, move, resize
    IsometricTileLayer
    Graphic
    
    ObjectLayer
    
    UiLayer
  

*/
/*
const game = Entity("playerMap").addComponents(
  Canvas("mainCanvas"),
  Viewport,
  LayerManager,
  Sockets(socket),
  Map({randomMap: true, sizeX: 5, sizeY: 5}),
  Render
);

window.addEventListener("resize", function() {
  game.emit("resize", {width: window.innerWidth, height: window.innerHeight});
});

//game.print();
//game.emit("loadMap", {startX: 0, startY:0, endX: 100, endY: 70});
game.components.layermanager.addLayer(IsometricTileLayer(game.get('map')));
game.components.layermanager.setSize(1920, 640);
//game.print();
game.components.layermanager.layers[0].drawMapRegion(game.get('ctx')) ;

//const a = IsometricTileLayer();
//console.log(a);

window.game = game;
//window.a = a;
*/
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

