class Enemy extends Phaser.GameObjects.PathFollower {
    constructor(scene, path, texture) {
        super(scene, path, 0, 0, texture);
        scene.add.existing(this);
        return this;
    }

    updatePosition(delta) {

    }

    updateFiring(delta) {

    }

    update(delta) {
        this.updatePosition(delta);
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
    constructor(scene, path) {
        super(scene, path, "Ship_Gunner");
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