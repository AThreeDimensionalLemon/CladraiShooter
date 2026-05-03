class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, texture, pathConfig) {
        super(
            scene, 
            path, 
            path.getStartPoint().x, 
            path.getStartPoint().y, 
            texture
        );
        // super(
        //     scene, 
        //     path, 
        //     path.getStartPoint().x + path.getLength() * pathConfig.from, 
        //     path.getStartPoint().y, 
        //     texture
        // );
        this.pathConfig = pathConfig;
        scene.add.existing(this);
        return this;
    }

    startMotion() {
        this.startFollow(this.pathConfig);
    }

    updateFiring(delta) {
        throw new Error("method not implemented!");
    }

    update(delta) {
        this.updateFiring(delta);
    }
}

class Artillerist extends Enemy {
    constructor(scene, path) {
        super(scene, path, "Ship_Artillerist");
        return this;
    }
}

class Gunner extends Enemy {
    constructor(scene, path, moveConfig) {
        super(scene, path, "Ship_Gunner", moveConfig);
        return this;
    }
}

class Medic extends Enemy {
    constructor(scene, path) {
        super(scene, path, "Ship_Medic");
        return this;
    }
}

class Runner extends Enemy {
    constructor(scene, x, y) {
        this.path = scene.add.path(x, y);
        super(scene, this.path, 0, 0, "Ship_Runner");
        return this;
    }
}

class Wall extends Enemy {
    constructor(scene, path) {
        super(scene, path, "Ship_Wall");
        return this;
    }
}