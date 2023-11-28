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
        this.load.image('SueloPadrera', 'assets/Suelo_Pradera_SinFondo.png');
        this.load.spritesheet('PowerUp', 'assets/PowerUp_Prov.png', { frameWidth: 32, frameHeight: 32 });
    },

    create: function() {
    ///////////////////////////////////////////////////////////////INSTANCIACION////////////////////////////////////////////////////////////////////
        coins = []; // Crea el grupo de monedas
        PowerUps= [];

        this.physics.world.bounds.width = 4000; // Limite al tamaño del mundo
        this.physics.world.bounds.height = 4000;
        this.cameras.main.setBounds(0, 0); // Define los limites de la camara
        
        this.add.image(1062, 590, 'sky').setScale(6,1.97); // Creacion del fondo

        suelo = this.physics.add.staticGroup({ // Suelo superior
            key: 'SueloPadrera',
            repeat: 1000,
            setScale: {x:0.5, y:0.5},
            setXY: { x: 0, y: 1146, stepX: 180 } 
        });

        platforms = this.physics.add.staticGroup(); // Definicion del grupo platforms
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // Instanciacion de las monedas
        coins[0]=this.physics.add.sprite(200, 590, 'coin').setScale(2); 
        coins[1]=this.physics.add.sprite(300, 590, 'coin').setScale(2); 

        //Instanciacion de los PowerUps
        PowerUps[0]=this.add.sprite(300, 800, 'PowerUp').setScale(3);

        // Instanciacion de los jugadores
        player1 = this.physics.add.sprite(0, 850, 'dude').setScale(4); // Creacion del jugador 1

        player1.setBounce(0.2); // Limites del jugador
        player1.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite(100, 850, 'dude').setScale(4); // Creacion del jugador 2

        player2.setBounce(0.2);// Limites del jugador
        player2.setCollideWorldBounds(true);

        // Instanciacion texto
        scoreText = this.add.text(100, 400, 'Score: 0', { fontSize: '50px', fill: '#000' });

//////////////////////////////////////////////////////////////////ANIMACIONES///////////////////////////////////////////////////////////////////////////
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
    // Animacion giro de la moneda
    this.anims.create({ 
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
        frameRate: 16,
        repeat: -1
    });
    //Animacion PowerUp
    this.anims.create({ 
        key: 'rotate',
        frames: this.anims.generateFrameNumbers('PowerUp', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
//////////////////////////////////////////////////////////////////////COLISIONES////////////////////////////////////////////////////////////////////////////
        this.physics.add.collider(player1, suelo); // Colisiones entre jugadores y entorno
        this.physics.add.collider(player2, suelo);
        this.physics.add.collider(player1, platforms); // Colisiones entre jugadores y entorno
        this.physics.add.collider(player2, platforms);
        for(let i = 0;i<coins.length;i++){
            this.physics.add.collider(suelo, coins[i]);
            this.physics.add.collider(suelo, coins[i]);
        }
        for(let i = 0;i<coins.length;i++){
            this.physics.add.collider(player1, coins[i], takePU, null, this);
            this.physics.add.collider(player2, coins[i], takePU, null, this);
        }
////////////////////////////////////////////////////////////////////INTERACCIONES///////////////////////////////////////////////////////////////////////////
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Teclas que utilizaremos
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
///////////////////////////////////////////////////////////////////////FUNCIONES////////////////////////////////////////////////////////////////////////////
    function takePU(player, coin){
        coin.disableBody(true, true);
    }
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

    for(let i = 0;i<coins.length;i++){
        coins[i].anims.play('spin',true);
    }
    for(let i = 0;i<PowerUps.length;i++){
        PowerUps[i].anims.play('rotate',true);
    }
    
    scoreText.x = Ahead().body.position.x;  
    

    function Ahead(){ // Funcion que devuelve el jugador mas adelantado
        if (player1.body.position.x>player2.body.position.x){
           return player1;
        }else{
            return player2;
        }
    }

    function fueraPlano(){ // Funcion que comprobara si un jugador se queda fuera de la pantalla
        if(Math.abs(player1.body.position.x-player2.body.position.x)>1200){
            if(player1.body.position.x>player2.body.position.x){
                scene.start("Scene2", { "message": "Player 1 ha ganado" });
            }else{
                scene.start("Scene2", { "message": "Player 2 ha ganado" });
            }
        }
    }
    }
});