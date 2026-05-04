const playerConfigs = { //configs for player instance
    maxShieldHealth: 3,
    maxHullHealth: 3,
    speed: 150,
    shieldRegenCooldown: 2000,
    laserCooldown: 500
}

//beginning to see why my professor said software engineering is a tradeoff between organization, performance, and shipping time, cuz this shit is not organized, nor performant, but damn it's amazing I managed to get this shipped in three days
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        //useful constants
        let gameConfigs = game.config;

        //initialization
        super(scene,  gameConfigs.width / 2, gameConfigs.height - (scene.config.spriteMargin + scene.config.endHeights), "Ship_Player");
        this.y -= this.height / 2;

        //object variables
        this.shieldHealth = playerConfigs.maxShieldHealth;
        this.hullHealth = playerConfigs.maxHullHealth;
        this.shieldRegenCooldown = playerConfigs.shieldRegenCooldown;
        this.laserCooldown = playerConfigs.laserCooldown;

        //bullets
        this.bullets = [];
        this.bulletSound = scene.sound.add("Laser_Player");

        //health
        //hull
        this.isAlive = true;
        this.hullBar = [];
        this.hullSprites = [
            scene.add.sprite(this.x, this.y, "Damage_2"),
            scene.add.sprite(this.x, this.y, "Damage_1")
        ];
        this.hullDamageSound = scene.sound.add("DamageHull");
        this.deathSound = scene.sound.add("Death_Player");

        //shield
        this.shieldBar = [];
        this.shieldSprites = [
            scene.add.sprite(this.x, this.y - 5, "Shield_1"),
            scene.add.sprite(this.x, this.y - 8, "Shield_2"),
            scene.add.sprite(this.x, this.y, "Shield_3"),
        ];
        this.shieldDownSound = scene.sound.add("Shield_Down");
        this.shieldUpSound = scene.sound.add("Shield_Up");

        //other stuff
        this.scene = scene;
        this.aKey = scene.input.keyboard.addKey("A");
        this.dKey = scene.input.keyboard.addKey("D");
        this.spaceKey = scene.input.keyboard.addKey("SPACE")

        //finalize
        scene.add.existing(this);
        return this;
    }

    damage() {
        if (this.shieldHealth > 0) {
            this.shieldHealth--;
            this.shieldBar[this.shieldHealth].visible = false;
            this.shieldSprites[this.shieldHealth].visible = false;
            if (!this.shieldHealth <= 0) this.shieldSprites[this.shieldHealth - 1].visible = true;
            else this.shieldDownSound.play();
        }
        else {
            this.hullHealth--;
            this.hullBar[this.hullHealth].visible = false;
            this.hullDamageSound.play();
            if (this.hullHealth > 0) this.hullSprites[this.hullHealth - 1].visible = true;
            else {
                this.isAlive = false;
                this.deathSound.play();
            }
        }
    }

    reset() {
        console.log(this.shieldSprites);

        //shield
        for (let shieldPoint of this.shieldBar) {
            shieldPoint.destroy();
        }
        this.shieldBar = [];
        for (let i = 0; i < playerConfigs.maxShieldHealth; i++) {
            //be a bit nicer if I didn't instantiatae a new sprite every time this is reset, but I'm running out of time, so this'll have to do
            let newUi = this.scene.add.sprite(this.scene.config.endHeights / 2 + 13 + i * 50, this.scene.footer.y, "Health_Shield");
            newUi.setAlpha(0.75);
            newUi.setScale(1.25);
            newUi.setDepth(3);
            this.shieldBar.push(newUi);
        }
        for (let shieldSprite of this.shieldSprites) {
            shieldSprite.setDepth(2);
            shieldSprite.visible = false;
        }
        this.shieldSprites[2].visible = true;
        this.shieldHealth = playerConfigs.maxShieldHealth;
        this.shieldRegenCooldown = playerConfigs.shieldRegenCooldown;
    }

    hardReset() {

        //hull
        this.hullBar = [];
        for (let i = 0; i < playerConfigs.maxHullHealth; i++) {
            let newUi = this.scene.add.sprite(this.scene.config.endHeights / 2 + 13 + i * 50, this.scene.footer.y, "Health_Hull");
            newUi.setDepth(2);
            this.hullBar.push(newUi);
        }
        for (let hullSprite of this.hullSprites) {
            hullSprite.setDepth(1);
            hullSprite.visible = false;
        }
        this.visible = true;
        this.isAlive = true;
        this.hullHealth = playerConfigs.maxHullHealth;
        this.reset();
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
            this.bulletSound.play();
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

        if (this.shieldHealth < playerConfigs.maxShieldHealth && this.shieldRegenCooldown > 0) this.shieldRegenCooldown -= delta;
        if (this.shieldRegenCooldown <= 0) {
            this.shieldHealth++;
            this.shieldBar[this.shieldHealth - 1].visible = true;
            if (this.shieldHealth > 1) this.shieldSprites[this.shieldHealth - 2].visible = false;
            this.shieldSprites[this.shieldHealth - 1].visible = true;
            this.shieldRegenCooldown = playerConfigs.shieldRegenCooldown;
            this.shieldUpSound.play();
        }

        this.laserCooldown -= delta;
    }
}