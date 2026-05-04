const playerConfigs = { //configs for player instance
    maxShieldHealth: 3,
    maxHullHealth: 3,
    speed: 75,
    shieldRegenCooldown: 5000,
    laserCooldown: 500
}

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        let gameConfigs = game.config;

        super(scene,  gameConfigs.width / 2, gameConfigs.height - (scene.config.spriteMargin + scene.config.endHeights), "Ship_Player");
        this.y -= this.height / 2;

        this.shieldHealth = playerConfigs.maxShieldHealth;
        this.hullHealth = playerConfigs.maxHullHealth;
        this.shieldRegenCooldown = playerConfigs.shieldRegenCooldown;
        this.laserCooldown = playerConfigs.laserCooldown;

        this.bullets = [];
        this.hull = [];
        this.hullSprites = [
            scene.add.sprite(this.x, this.y, "Damage_1"),
            scene.add.sprite(this.x, this.y, "Damage_2")
        ];
        this.shield = [];
        this.shieldSprites = [
            scene.add.sprite(this.x, this.y, "Shield_1"),
            scene.add.sprite(this.x, this.y, "Shield_2"),
            scene.add.sprite(this.x, this.y, "Shield_3"),
        ];

        this.scene = scene;
        this.aKey = scene.input.keyboard.addKey("A");
        this.dKey = scene.input.keyboard.addKey("D");
        this.spaceKey = scene.input.keyboard.addKey("SPACE")

        for (let i = 0; i < playerConfigs.maxHullHealth; i++) {
            let newUi = scene.add.sprite(scene.config.endHeights / 2 + 13 + i * 50, scene.footer.y, "Health_Hull");
            newUi.setDepth(2);
            this.hull.push(newUi);
        }
        for (let hullSprite of this.hullSprites) {
            hullSprite.setDepth(1);
            hullSprite.visible = false;
        }
        for (let i = 0; i < playerConfigs.maxShieldHealth; i++) {
            let newUi = scene.add.sprite(scene.config.endHeights / 2 + 13 + i * 50, scene.footer.y, "Health_Shield");
            newUi.setAlpha(0.75);
            newUi.setScale(1.25);
            newUi.setDepth(3);
            this.hull.push(newUi);
        }
        for (let shieldSprite of this.shieldSprites) {
            shieldSprite.setDepth(2);
            shieldSprite.visible = false;
        }
        this.shieldSprites[2].visible = true;

        scene.add.existing(this);
        return this;
    }

    damage() {
        console.log("lose health");
    }

    update(delta) {
        if (this.aKey.isDown && this.x > this.width / 2 + this.scene.config.spriteMargin) {
            this.x -= playerConfigs.speed / delta;
        }
        if (this.dKey.isDown && this.x < game.config.width - (this.width / 2 + this.scene.config.spriteMargin)) {
            this.x += playerConfigs.speed / delta;
        }

        if (this.spaceKey.isDown && this.laserCooldown <= 0) {
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
            if (!hasInactive) this.bullets.push(new PlayerBullet(this.scene, this.x, this.y - this.height / 2));
            this.laserCooldown = playerConfigs.laserCooldown;
        }

        for (let bullet of this.bullets) {
            bullet.update(delta);
        }

        for (let damage of this.hullSprites) {
            damage.x = this.x;
        }
        for (let shield of this.shieldSprites) {
            shield.x = this.x;
        }

        this.laserCooldown -= delta;
    }
}