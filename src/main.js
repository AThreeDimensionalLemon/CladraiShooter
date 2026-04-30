"use strict"

let config = {
    width: 800,
    height: 1200,
    type: Phaser.CANVAS,
    parent: 'phaser-game',
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT
    },
    scene: [PlayField]
}

const game = new Phaser.Game(config);
