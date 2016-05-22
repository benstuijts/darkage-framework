module.exports = {
    
    "grass" : {
        graph: {
            type: "spritesheet",
            image: {
                "idle": {
                    src:"./images/worldmap/nature/land_spritesheet_idle_400x100.png",
                    width: 100, height: 100,
                    xpos: 0, ypos: 0
                }
            }
        },
        meta: {
            name: "grass"
        }
    },
    
    "water" : {
        graph: {
            type: "animated",
            image: {
                "idle" : {
                    src: "./images/worldmap/nature/water_idle_100x100.png",
                    width: 100, height: 100,
                    xpos: 0, ypos: 100
                }
            }
        },
        meta: {
            name: "water"
        }
    },
    
};