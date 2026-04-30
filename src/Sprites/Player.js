const playerConfigs = { //configs for player instance
    maxShieldHealth: 3,
    maxHullHealth: 3,
    speed: 75,
    shieldRegenCooldown: 5,
    laserCooldown: 1
}

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene,  game.config.width / 2, game.config.height - scene.config.spriteMargin, "Ship_Player");
        this.y -= this.height / 2;

        this.shieldHealth = playerConfigs.maxShieldHealth;
        this.hullHealth = playerConfigs.maxHullHealth;
        this.shieldRegenCooldown = playerConfigs.shieldRegenCooldown;
        this.laserCooldown = playerConfigs.laserCooldown;

        this.bullets = [];

        this.aKey = scene.input.keyboard.addKey("A");
        this.dKey = scene.input.keyboard.addKey("D");

        scene.input.keyboard.addKey("SPACE").on('down', (key, event) => {
            let hasInactive = false;
            for (let i = 0; i < this.bullets.length; i++) {
                if (!this.bullets[i].isActive) {
                    let bullet = this.bullets[i];
                    bullet.x = this.x;
                    bullet.y = this.y - this.height / 2;
                    bullet.isActive = true;
                    bullet.visible = true;
                    
                    hasInactive = true;
                    break;
                }
            }
            if (!hasInactive) this.bullets.push(new PlayerBullet(scene, this.x, this.y - this.height / 2));
        });

        scene.add.existing(this);
        return this;
    }

    update(delta) {
        if (this.aKey.isDown && !this.dKey.isDown && this.x > this.width / 2 + this.scene.config.spriteMargin) {
            this.x -= playerConfigs.speed / delta;
        }

        if (this.dKey.isDown && !this.aKey.isDown && this.x < game.config.width - (this.width / 2 + this.scene.config.spriteMargin)) {
            this.x += playerConfigs.speed / delta;
        }

        for (let bullet of this.bullets) {
            bullet.update(delta);
        }
    }
}