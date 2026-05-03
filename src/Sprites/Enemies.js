class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, texture, pathConfig) {
        super(scene, path, path.getStartPoint().x, path.getStartPoint().y, texture);
        this.pathConfig = pathConfig;
        this.firingCooldown = 2000 + Math.random() * 3000;
        scene.add.existing(this);
        return this;
    }

    startMotion() {
        this.startFollow(this.pathConfig);
    }

    updateFiring(delta) {

    }

    updateRotation() {
        let player = this.scene.player;
        let inAngle = Math.atan((player.y - this.y) / (player.x - this.x));
        this.setRotation(inAngle + (Math.PI / 2) * ((inAngle >= 0) ? -1 : 1));
    }

    update(delta) {
        this.updateFiring(delta);
        this.updateRotation();
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