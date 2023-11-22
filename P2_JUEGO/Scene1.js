var Scene1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "Scene1" });
    },

    init: function() {},

    preload: function() {
        this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('sky','assets/sky.png');
        this.load.image('ground','assets/platform.png');
    },

    create: function() {
        var cam = this.cameras.main;
        //cam.setBounds(0, 25, 5, 5);
        

        //cam.setSize(2240, 1180);
        this.add.image(1062, 590, 'sky').setScale(2.7,1.97);

        platforms = this.physics.add.staticGroup();

        platforms.create(1062, 1146, 'ground').setScale(6,3).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player1 = this.physics.add.sprite(100, 450, 'dude').setScale(5);

        player1.setBounce(0.2);
        player1.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite(500, 450, 'dude').setScale(5);

        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);


        // Carga la animacion de andar hacia la izquierda
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    // Carga la animacion de darse la vuelta
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    // Carga la animacion de ir hacia la dcha
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

        this.physics.add.collider(player1, platforms);
        this.physics.add.collider(player2, platforms);


        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    },

    // Update
    update: function() {
        cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown){
        player1.setVelocityX(-300);

        player1.anims.play('left', true);
    }
    else if (cursors.right.isDown){
        player1.setVelocityX(300);

        player1.anims.play('right', true);
    }
    else{
        player1.setVelocityX(0);

        player1.anims.play('turn');
    }

    if (cursors.up.isDown && player1.body.touching.down){
        player1.setVelocityY(-500);
    }

    if (this.keyA.isDown){
        player2.setVelocityX(-300);

        player2.anims.play('left', true);
    }
    else if (this.keyD.isDown){
        player2.setVelocityX(300);

        player2.anims.play('right', true);
    }
    else{
        player2.setVelocityX(0);

        player2.anims.play('turn');
    }

    if (this.keyW.isDown && player2.body.touching.down){
        player2.setVelocityY(-500);
    }

    if(this.keyP.isDown){
            this.scene.start("Scene2", { "message": "Game Over" });
    }
    function Ahead(){
        if (player1.body.position.x>player2.body.position.x){
            return player1;
        }else{
            return player2;
        }
    }
    this.cameras.main.startFollow(Ahead());
    }
});
