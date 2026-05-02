class PlayField extends Phaser.Scene {
    constructor() {
        super("playField");

        this.config = {
            spriteMargin: 25,
            rowsAmount: 5
        }

        this.states = [
            new IntermissionState(this),
            new PlayState(this),
            new EndState(this),
            new TestState(this)
        ]
        this.state = this.states[0];
    }

    setState(inState) {
        this.state = this.states[inState];
        this.state.start();
    }

    preload() {
        this.load.setPath("./assets");
        this.load.image("Damage_1");
        this.load.image("Damage_2");
        this.load.image("Health_Hull");
        this.load.image("Health_Shield");
        this.load.image("Laser_Enemy");
        this.load.image("Laser_Player");
        this.load.image("Shield_1");
        this.load.image("Shield_2");
        this.load.image("Shield_3");
        this.load.image("Ship_Artillerist");
        this.load.image("Ship_Gunner");
        this.load.image("Ship_Medic");
        this.load.image("Ship_Player");
        this.load.image("Ship_Runner");
        this.load.image("Ship_Wall");
    }

    create() {
        this.player = new Player(this);

        this.rows = [];
        let enemyHeight = 84;
        let spriteMargin = this.config.spriteMargin;
        for (let row = 0; row < this.config.rowsAmount; row++) {
            let newPath = this.add.path( //start point
                spriteMargin + this.player.width / 2, //distance from side
                spriteMargin + enemyHeight / 2 + //distance from top
                (enemyHeight / 2 + spriteMargin * 4) * row //row offsets
            );
            newPath.lineTo( //end point
                game.config.width - spriteMargin - this.player.width / 2, 
                newPath.getStartPoint().y
            );
            this.rows.push(newPath);
        }

        this.state.start();
    }

    update(time, delta) {
        this.state.update(time, delta);
    }
}

class PlayFieldState {
    constructor(scene) {
        this.scene = scene;
        return this;
    }

    start() {
        throw new Error("Method not implemented!");
    }

    update(time, delta) {
        throw new Error("Method not implemented!");
    }
}

const countdown = 3;
class IntermissionState extends PlayFieldState {
    constructor(scene) {
        super(scene);

        return this;
    }
    
    start() {
        this.timeElapsed = 0;
        this.timerTime = countdown;

        if (this.timer) {
            this.timer.setText(countdown);
            this.timer.visible = true;
        }
        else { //instantiated here because Phaser throws a fit when instantiated in PlayField's constructor
            let config = game.config;
            this.timer = new Phaser.GameObjects.Text(this.scene, config.width / 2, config.height / 2, this.timerTime, {
                fontSize: 96,
                color: "#ffffff"
            });
            this.scene.add.existing(this.timer);
        }
    }

    update(time, delta) {
        this.timeElapsed += delta / 1000;
        if (this.timeElapsed >= 1) {
            this.timerTime--;
            this.timeElapsed = 0;
            this.timer.setText(this.timerTime);
            if (this.timerTime == 0) {
                this.timer.visible = false;
                this.scene.setState(1);
            }
        }
    }
}

class PlayState extends PlayFieldState {
    constructor(scene) {
        super(scene);
        return this;
    }
    
    start() {
        console.log("PlayState active!");
    }

    update(time, delta) {
        this.scene.player.update(delta);
        
    }
}

class EndState extends PlayFieldState {
    constructor(scene) {
        super(scene);
        return this;
    }
    
    start() {}

    update(time, delta) {
        
    }
}

class TestState extends PlayFieldState {
    constructor(scene) {
        super(scene);
        return this;
    }
    
    start() {
        this.scene.testEnemies = [];
        for (let i = 0; i < this.scene.config.rowsAmount; i++) {
            let newTestEnemy = new Artillerist(this.scene, this.scene.rows[i]);
            this.scene.testEnemies.push(newTestEnemy);
            this.scene.add.existing(newTestEnemy);
        }
    }

    update(time, delta) {
        
    }
}