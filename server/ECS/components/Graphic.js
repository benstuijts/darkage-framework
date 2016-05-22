'use strict';
const Graphic = function( options ) {
    if(!options) options = {};
    const component = {
        _name : 'graphic',
        type: options.type || 'sprite',
        state: options.state || 'idle',
        image: options.image || {},
    }; 
    return component;
};

module.exports = Graphic;

/*  image is Object. Animations are organised by "state" of the graphic.
    A sprite have one graphic with the state "idle", xpos and ypos are mostly 0.
    A spritesheet image have one graphic with the state "idle" and a xpos and ypos, to locate the image on the spritesheet.
    A animation have a spritesheet with one or more states.

    image = {
        "idle": {
            src: "hero_idle.png",
            xpos: 0,
            ypos: 0,
            width: 100,
            height: 100,
        },
        "walk east" : {
            src: "hero_walk_east.png",
            xpos: 0,
            ypos: 0,
            width: 100,
            height: 100
        }
        
    };

*/