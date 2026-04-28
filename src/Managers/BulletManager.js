class BulletManager extends Phaser.GameObjects.Group {
    constructor() {
        super({
            name: "Bullets", 
            maxSize: 50
        });
<<<<<<< HEAD

        scene.add.existing(this);
=======
>>>>>>> 17c09797fc9fdbe23adaeb0c6eb5c15619cbf844
        return this;
    }
}