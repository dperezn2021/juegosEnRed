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
        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('wall','assets/pared.png');
    },

    create: function() {
        
        this.add.image(1062, 590, 'sky').setScale(6,1.97); // Creacion del fondo

        platforms = this.physics.add.staticGroup(); // Definicion del grupo platforms

        platforms.create(1062, 1146, 'ground').setScale(12.21,15).refreshBody(); // Suelo

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        platforms.create(-1300,100,'wall').setScale(5).refreshBody(); // Pared

        coins = this.physics.add.staticGroup();

        coins.create(300, 600, 'coin');

        this.physics.add.collider(coins, platforms); // Hace que las monedas reboten con el terreno

        player1 = this.physics.add.sprite(100, 450, 'dude').setScale(4); // Creacion del jugador 1

        player1.setBounce(0.2); // Limites del jugador
        //player1.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite(500, 450, 'dude').setScale(4); // Creacion del jugador 2

        player2.setBounce(0.2);// Limites del jugador
        //player2.setCollideWorldBounds(true);


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

        this.physics.add.collider(player1, platforms); // Colisiones entre jugadores y entorno
        this.physics.add.collider(player2, platforms);

        this.anims.create({ // Animacion de la moneda
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 16,
            repeat: -1
        });

        coins.anims.play('spin', true);


        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Teclas que utilizaremos
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    },

    // Update
    update: function() {
        var cam = this.cameras.main;
        var scene = this.scene;
        fueraPlano();
        cursors = this.input.keyboard.createCursorKeys(); // Flechas

    if (cursors.left.isDown){ // Interacciones con las flechas (Player1)
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

    if (this.keyA.isDown){ // Interacciones W-A-S-D (Player2)
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

    if(this.keyP.isDown){ // Cambio de escena
            scene.start("Scene2", { "message": "Game Over" });
    }
    cam.startFollow(Ahead()); // La camara sigue al jugador mas adelantado

    function Ahead(){ // Funcion que devuelve el jugador mas adelantado
        if (player1.body.position.x>player2.body.position.x){
           return player1;
        }else{
            return player2;
        }
    }

    function fueraPlano(){ // Funcion que comprobara si un jugador se queda fuera de la pantalla
        if(Math.abs(player1.body.position.x-player2.body.position.x)>1170){
            scene.start("Scene2", { "message": "Player 2 ha ganado" });
        }else if(player2.body.position.x<cam.alphaBottomLeft){
            scene.start("Scene2", { "message": "Player 1 ha ganado" });
        }
    }
    }
});
