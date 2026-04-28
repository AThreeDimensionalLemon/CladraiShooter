const playerConfigs = { //configs for player instance
    maxShieldHealth: 3,
    maxHullHealth: 3,
    shieldRegenCooldown: 5,
    laserCooldown: 1
}

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Ship_Player");
        this.shieldHealth = playerConfigs.maxShieldHealth;
        this.hullHealth = playerConfigs.maxHullHealth;
        this.shieldRegenCooldown = playerConfigs.shieldRegenCooldown;
        this.laserCooldown = playerConfigs.laserCooldown;

        scene.add.existing(this);
        return this;
    }
}