'use strict';
const Graphic  = require("../../ECS/components/Graphic");
const Meta  = require("../../ECS/components/Meta");

module.exports = [
      Graphic({
        type: "sprite",
        image: {
          "idle": {
            src: "./images/worldmap/unit/legereenheid.png",
            width: 48, height: 48,
            xpos: 0, ypos: 0
          }
        }
      }),
      Meta({
        name: "A group if simple soldiers level 1"
      })
  ];