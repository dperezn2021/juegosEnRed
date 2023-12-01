var Scene1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "Scene1" });
    },

    init: function() {},

    preload: function() {
        this.load.spritesheet('dude', 
        'assets/Partida/dude.png',
        { frameWidth: 32, frameHeight: 48 }
        );
        this.load.image('sky','assets/Background/sky.png');
        this.load.image('ground','assets/Terreno/platform.png');
        this.load.spritesheet('coin', 'assets/Partida/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('wall','assets/Terreno/pared.png');
        this.load.image('SueloPadrera', 'assets/Terreno/Suelo_Pradera_SinFondo.png');
        this.load.spritesheet('PowerUp', 'assets/Partida/PowerUp_Prov.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloPU', 'assets/Interfaz/CirculoPU.png');
        this.load.image('snowball', 'assets/Interfaz/snowball.png');
        this.load.image('electricBall', 'assets/Interfaz/BolaRayo.png');
        this.load.image('potion', 'assets/Interfaz/Potion.png');
        this.load.image('battery', 'assets/Interfaz/Battery.png');
        this.load.image('boots', 'assets/Interfaz/boots.png');
        this.load.image('rock', 'assets/Partida/roquita.png');
    },

    create: function() {
    ///////////////////////////////////////////////////////////////INSTANCIACION////////////////////////////////////////////////////////////////////
        coins = []; // Crea el grupo de monedas
        PowerUps= [];
        breakW = [];

        this.physics.world.bounds.width = 4000; // Limite al tamaño del mundo
        this.physics.world.bounds.height = 1000;
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
        PowerUps[0]=this.physics.add.sprite(600, 800, 'PowerUp').setScale(3);
        PowerUps[1]=this.physics.add.sprite(800, 800, 'PowerUp').setScale(3);

        // Instanciacion de los jugadores
        player1 = this.physics.add.sprite(0, 850, 'dude').setScale(4); // Creacion del jugador 1(cursors)
        player1.tipoPU = -1;
        player1.canDoubleJump = false
        player1.vel = 250;
        player1.numJump = 0;
        player1.fuerza = 8;
        player1.score = 0;

        player1.setBounce(0.2); // Limites del jugador
        player1.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite(100, 850, 'dude').setScale(4); // Creacion del jugador 2 (WASD)
        player2.tipoPU = -1;
        player2.canDoubleJump = false
        player2.vel = 300;
        player2.numJump = 0;
        player2.fuerza = 5;
        player2.score = 0;

        player2.setBounce(0.2);// Limites del jugador
        player2.setCollideWorldBounds(true);

        // Instanciacion texto
        scoreText1 = this.add.text(0, 50, 'Hitt: 0', { fontSize: '50px', fill: '#000' }).setScrollFactor(0);
        scoreText2 = this.add.text(1700, 50, '0: Ufo', { fontSize: '50px', fill: '#000' }).setScrollFactor(0);
        this.add.image(70, 160, 'circuloPU').setScale(0.2).setScrollFactor(0); // Instanciacion de los circulos PU
        this.add.image(1900, 160, 'circuloPU').setScale(0.2).setScrollFactor(0); 

        // Instanciacion rocas
        roca1 = this.physics.add.sprite(3000, 800, 'rock').setScale(0.5).setFriction(1);

        // Muros rompibles
        breakW[0] = this.physics.add.staticImage(1000, 748, 'wall').setScale(2, 1);
        for(let i = 0; i<breakW.length;i++){
            breakW[i].dureza=40;
            breakW[i].tocado = false;
        }

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
        for(let i = 0;i<coins.length;i++){ // Colisiones entre moneda y suelo
            this.physics.add.collider(coins[i], suelo);
        }
        for(let i = 0;i<PowerUps.length;i++){ // Colisiones entre Power Up y suelo
            this.physics.add.collider(PowerUps[i], suelo);
        }
        for(let i = 0;i<breakW.length;i++){ // Colisiones entre Muros rompibles y el suelo
            this.physics.add.collider(breakW[i], suelo);
        }
        for(let i = 0;i<coins.length;i++){ // Colisiones entre monedas y jugador
            this.physics.add.collider(player1, coins[i], takeCoin, null, this);
            this.physics.add.collider(player2, coins[i], takeCoin, null, this);
        }
        for(let i = 0;i<PowerUps.length;i++){ // Colisiones entre PowerUps y jugador
            this.physics.add.collider(player1, PowerUps[i], takePU, null, this);
            this.physics.add.collider(player2, PowerUps[i], takePU, null, this);
        }
        for(let i = 0;i<breakW.length;i++){ // Colisiones entre los muros rompibles y jugador
            this.physics.add.collider(player1, breakW[i], contacto, null, this);
            this.physics.add.collider(player2, breakW[i], contacto, null, this);
        }
        this.physics.add.collider(roca1, suelo); // Colisiones entre las rocas y el escenario
        this.physics.add.collider(roca1, platforms); 
        this.physics.add.collider(player2, roca1, empujar, null, this);
        this.physics.add.collider(player1, roca1, empujar, null, this);

////////////////////////////////////////////////////////////////////INTERACCIONES///////////////////////////////////////////////////////////////////////////
        // Controles Jugador 2
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Arriba
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Izquierda
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Derecha
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Power Up
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q); // Interactuar

        // Controles Jugador 1
        this.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);  // Arriba
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);  // Izquierda
        this.keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);  // Derecha
        this.keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);  // Interactuar
        this.keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);  // Power Up
///////////////////////////////////////////////////////////////////////FUNCIONES////////////////////////////////////////////////////////////////////////////
    function takeCoin(player, coin){
        coin.disableBody(true, true);

        if(player == player1){
            player1.score += 100; // Actualiza la puntuacion
            scoreText1.setText('Hitt: ' + player1.score);
        }else if (player == player2){
            player2.score += 100; // Actualiza la puntuacion
            scoreText2.setText(player2.score+' : Ufo');
        }
    }
    function takePU(player, PU){
        PU.disableBody(true, true);

        if(player == player1){
            if(player1.tipoPU==-1){
            rand = Math.floor(Math.random() * 4);
            switch(rand){
                case 0:
                     player1.tipoPU = 0;
                     Objeto1 = this.add.image(70, 160, 'snowball').setScale(2).setScrollFactor(0); 
                    break;
                case 1:
                     player1.tipoPU = 1;
                     Objeto1 = this.add.image(70, 160, 'electricBall').setScale(0.1).setScrollFactor(0); 
                    break;
                case 2:
                     player1.tipoPU = 2;
                     Objeto1 = this.add.image(70, 160, 'potion').setScale(2.3).setScrollFactor(0); 
                    break;
                case 3:
                     player1.tipoPU = 3;
                     Objeto1 = this.add.image(70, 160, 'boots').setScale(0.3).setScrollFactor(0); 
                    break;
            }
            }
        }else if (player == player2){
            if(player2.tipoPU==-1){
            rand = Math.floor(Math.random() * 4);
            switch(rand){
                case 0:
                     player2.tipoPU = 0;
                     Objeto2 = this.add.image(1900, 160, 'snowball').setScale(2).setScrollFactor(0); 
                    break;
                case 1:
                     player2.tipoPU = 1;
                     Objeto2 = this.add.image(1900, 160, 'electricBall').setScale(0.1).setScrollFactor(0); 
                    break;
                case 2:
                     player2.tipoPU = 2;
                     Objeto2 = this.add.image(1900, 160, 'battery').setScale(0.15).setScrollFactor(0); 
                    break;
                case 3:
                     player2.tipoPU = 3;
                     Objeto2 = this.add.image(1900, 160, 'boots').setScale(0.3).setScrollFactor(0); 
                    break;
            }
            }
        }
    }
    function empujar(player, roca){
        if(player==player2){
            if(roca.body.touching.left){
                roca.setVelocityX(player2.fuerza);
                this.time.addEvent({ delay: 1500, callback:stop, callbackScope: this});
            }else if(roca.body.touching.right){
                roca.setVelocityX(-player2.fuerza);
                this.time.addEvent({ delay: 1500, callback:stop, callbackScope: this});
            }
        }else if(player == player1){
            if(roca.body.touching.left){
                roca.setVelocityX(player1.fuerza);
                this.time.addEvent({ delay: 1500, callback:stop, callbackScope: this});
            }else if(roca.body.touching.right){
                roca.setVelocityX(-player1.fuerza);
                this.time.addEvent({ delay: 1500, callback:stop, callbackScope: this});
            }
        }
    }
    function stop(){
        roca1.setVelocityX(0);
    }
    function contacto(player, wall){
        wall.tocado = true;
    }
    },

    // Update
    update: function() {
        var cam = this.cameras.main;
        var scene = this.scene;
        fueraPlano();
        cursors = this.input.keyboard.createCursorKeys(); // Flechas
    
    ////////////////////////////////////////////////////////////CONTROLES////////////////////////////////////////////////////////////////////////////////////
    // Controles player 1
    if (this.keyJ.isDown){ 
        player1.setVelocityX(-player1.vel);

        player1.anims.play('left', true);
    }
    else if (this.keyL.isDown){
        player1.setVelocityX(player1.vel);

        player1.anims.play('right', true);
    }
    else{
        player1.setVelocityX(0);

        player1.anims.play('turn');
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyI)) {
        if (player1.body.touching.down) {
          player1.canDoubleJump = true;
          player1.body.setVelocityY(-400);
        } else if (player1.numJump>0 && player1.canDoubleJump) {
          // player can only jump 2x (double jump)
          player1.canDoubleJump = false;
          player1.body.setVelocityY(-400);
          player1.numJump--;
        }
      }

    // Controles player 2
    if (this.keyA.isDown){ // Interacciones W-A-S-D (Player2)
        player2.setVelocityX(-player2.vel);

        player2.anims.play('left', true);
    }
    else if (this.keyD.isDown){
        player2.setVelocityX(player2.vel);

        player2.anims.play('right', true);
    }
    else{
        player2.setVelocityX(0);

        player2.anims.play('turn');
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
        if (player2.body.touching.down) {
          player2.canDoubleJump = true;
          player2.body.setVelocityY(-400);
        } else if (player2.numJump>0 && player2.canDoubleJump) {
          player2.canDoubleJump = false;
          player2.body.setVelocityY(-400);
          player2.numJump--;
        }
    }
    ///////////////////////////////////////////////////////////////COMPROBACIONES///////////////////////////////////////////////////////////////////////////
    cam.centerOnX(Ahead().x); // La camara sigue al jugador mas adelantado

    if(this.keyE.isDown){ // Accion jugador 2
        switch(player2.tipoPU){
            case 0:
                Objeto2.destroy();
                player2.tipoPU = -1;
                this.time.addEvent({ delay: 0, callback:congelado, callbackScope: this});
                this.time.addEvent({ delay: 2500, callback:descongelado, callbackScope: this});
                break;
            case 1:
                Objeto2.destroy();
                player2.tipoPU = -1;
                this.time.addEvent({ delay: 0, callback:paralizado, callbackScope: this});
                this.time.addEvent({ delay: 1500, callback:desparalizado, callbackScope: this});
                break;
            case 2:
                Objeto2.destroy();
                this.time.addEvent({ delay: 0, callback:esteroides, callbackScope: this});
                this.time.addEvent({ delay: 2500, callback:desinflado, callbackScope: this});
                player2.tipoPU = -1;
                break;
            case 3:
                Objeto2.destroy();
                player2.tipoPU = -1;
                player2.numJump = 10;
                break;
        }
    }
    if(this.keyO.isDown){ // Accion Jugador1
        switch(player1.tipoPU){
            case 0:
                Objeto1.destroy();
                player1.tipoPU = -1;
                this.time.addEvent({ delay: 0, callback:congelado, callbackScope: this});
                this.time.addEvent({ delay: 2500, callback:descongelado, callbackScope: this});
                break;
            case 1:
                Objeto1.destroy();
                player1.tipoPU = -1;
                this.time.addEvent({ delay: 0, callback:paralizado, callbackScope: this});
                this.time.addEvent({ delay: 1500, callback:desparalizado, callbackScope: this});
                break;
            case 2:
                Objeto1.destroy();
                player1.tipoPU = -1;
                this.time.addEvent({ delay: 0, callback:correr, callbackScope: this});
                this.time.addEvent({ delay: 2500, callback:parar, callbackScope: this});
                break;
            case 3:
                Objeto1.destroy();
                player1.tipoPU = -1;
                player1.numJump = 10;
                break;
        }
    }
    for(let i = 0; i<breakW.length;i++){
        if(Phaser.Input.Keyboard.JustDown(this.keyQ) && breakW[i].tocado == true){ // Interaccion con breakable Walls
            breakW[i].dureza -= player2.fuerza;
        }else if(Phaser.Input.Keyboard.JustDown(this.keyU) && breakW[i].tocado == true){
            breakW[i].dureza -= player1.fuerza;
        }
        if(breakW[i].dureza<40 && breakW[i].dureza > 20){
            breakW[i].setTint(0xF0F720);
        }else if(breakW[i].dureza<20 && breakW[i].dureza > 10){
            breakW[i].setTint(0xFF6A06);
        }else if(breakW[i].dureza<10){
            breakW[i].setTint(0xFF0000);
        } 
        if(breakW[i].dureza<=0){
            breakW[i].destroy();
        }
        breakW[i].tocado = false;
    }
    
    /////////////////////////////////////////////////////////////////ANIMACIONES////////////////////////////////////////////////////////////////////////////
    for(let i = 0;i<coins.length;i++){
        coins[i].anims.play('spin',true);
    }
    for(let i = 0;i<PowerUps.length;i++){
        PowerUps[i].anims.play('rotate',true);
    }

    ////////////////////////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////////////
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

    function congelado(){
        if(this.keyE.isDown){
            player1.setTint(0x0000ff); // pinta al jugador de rojo
            player1.vel = 150;
        }else if(this.keyO.isDown){
            player2.setTint(0x0000ff); // pinta al jugador de rojo
            player2.vel = 150;
        }
    }
    function descongelado(){
        if(player1.vel == 150){
            player1.clearTint(); // pinta al jugador de rojo
            player1.vel = 250;
        }else if(player2.vel == 150){
            player2.clearTint(); // pinta al jugador de rojo
            player2.vel = 300;
        }
    }
    function paralizado(){
        if(this.keyE.isDown){
            player1.setTint(0xffff00); // pinta al jugador de rojo
            player1.vel = 0;
        }else if(this.keyO.isDown){
            player2.setTint(0xffff00); // pinta al jugador de rojo
            player2.vel = 0;
        }
    }
    function desparalizado(){
        if(player1.vel == 0){
            player1.clearTint(); // pinta al jugador de rojo
            player1.vel = 250;
        }else if(player2.vel == 0){
            player2.clearTint(); // pinta al jugador de rojo
            player2.vel = 300;
        }
    }
    function correr(){
        player1.setTint(0x00FFFF);
        player1.vel = 400;
    }
    function parar(){
        player1.clearTint();
        player1.vel = 300;
    }
    function esteroides(){
        player2.setTint(0x00FFFF);
        player2.fuerza = 80;
    }
    function desinflado(){
        player2.clearTint();
        player2.fuerza=30;
    }
    }
});