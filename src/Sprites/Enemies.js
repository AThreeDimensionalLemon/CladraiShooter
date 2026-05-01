class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        return this;
    }
}

class Artillerist extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "Ship_Artillerist");
        return this;
    }
}

class Gunner extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "Ship_Gunner");
        return this;
    }
}

class Medic extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "Ship_Medic");
        return this;
    }
}

class Runner extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "Ship_Runner");
        return this;
    }
}

class Wall extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "Ship_Wall");
        return this;
    }
}