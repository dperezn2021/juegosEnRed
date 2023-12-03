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
        this.load.image('sky','assets/Background/fondo.png');
        this.load.image('sueloP1','assets/Terreno/z1/p1_z1.png');
        this.load.image('sueloCartel','assets/Terreno/z1/p3_z1.png');
        this.load.image('sueloHierba','assets/Terreno/z1/p2_z1.png');
        this.load.image('sueloP4','assets/Terreno/z1/p4_z1.png');
        this.load.image('sueloB2','assets/Terreno/z1/b2_z1.png');
        this.load.image('sueloM1','assets/Terreno/z1/m1_z1.png');
        this.load.image('sueloM2','assets/Terreno/z5/m1_z5.png');
        this.load.image('sueloP3','assets/Terreno/z1/p3_z1.png');
        this.load.image('suelo3','assets/Terreno/sueloPorBloques/3.png');
        this.load.image('suelo2','assets/Terreno/sueloPorBloques/2.png');
        this.load.image('suelo1','assets/Terreno/sueloPorBloques/1.png');
        this.load.image('suelo4','assets/Terreno/sueloPorBloques/4y13.png');
        this.load.image('suelo5','assets/Terreno/sueloPorBloques/5y14.png');
        this.load.image('suelo6','assets/Terreno/sueloPorBloques/6y15.png');
        this.load.image('suelo9','assets/Terreno/sueloPorBloques/9.png');
        this.load.image('suelo10','assets/Terreno/sueloPorBloques/10.png');
        this.load.image('suelo11','assets/Terreno/sueloPorBloques/11.png');
        this.load.image('suelo12','assets/Terreno/sueloPorBloques/12.png');
        this.load.image('suelo18','assets/Terreno/sueloPorBloques/18.png');
        this.load.image('suelo19','assets/Terreno/sueloPorBloques/19.png');
        this.load.image('suelo20','assets/Terreno/sueloPorBloques/20.png');
        this.load.image('pared','assets/Terreno/sueloPorBloques/pared.png');
        this.load.spritesheet('coin', 'assets/Partida/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('wall','assets/Partida/paredRompible.png');
        this.load.spritesheet('PowerUp', 'assets/Partida/PowerUp_Prov.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloPU', 'assets/Interfaz/CirculoPU.png');
        this.load.image('snowball', 'assets/Interfaz/BoladehieloPU.png');
        this.load.image('electricBall', 'assets/Interfaz/RayoParalizantePU.png');
        this.load.image('potion', 'assets/Interfaz/PocionHittPU.png');
        this.load.image('battery', 'assets/Interfaz/Battery.png');
        this.load.image('boots', 'assets/Interfaz/boots.png');
        this.load.image('rock', 'assets/Partida/bola.png');
        this.load.spritesheet('Hitt', 'assets/Partida/SpriteSheetHitt.png', { frameWidth: 315.5, frameHeight: 441 });
        this.load.image('pincho1', 'assets/Partida/pincho1.png');
        this.load.image('pincho2', 'assets/Partida/pincho2.png');
    },

    create: function() {
    ///////////////////////////////////////////////////////////////INSTANCIACION////////////////////////////////////////////////////////////////////
        coins = []; // Crea el grupo de monedas
        PowerUps= [];
        breakW = [];
        pinchos = [];
        paused = false;

        this.physics.world.bounds.width = 8544; // Limite al tamaño del mundo
        this.physics.world.bounds.height = 1000;
        this.cameras.main.setBounds(0, 0,8530,1000); // Define los limites de la camara
        
        this.add.image(1062, 590, 'sky').setScale(1).setOrigin(0.125,0.59); // Creacion del fondo

        platforms = this.physics.add.staticGroup(); // Definicion del grupo platforms
        // Definicion Zona 1
        platforms.create(135, 960, 'suelo1');
        platforms.create(370, 925, 'suelo2').setScale(1,1.1);
        platforms.create(1089, 960, 'suelo3').setScale(1.2,1);
        platforms.create(840, 690, 'sueloP4').setScale(0.9,1);
        platforms.create(1100, 560, 'sueloB2');
        platforms.create(770, 400, 'sueloCartel');
        platforms.create(417, 350, 'sueloHierba');
        platforms.create(140, 250, 'sueloP1');
        platforms.create(1300, 330, 'sueloM1');
        platforms.create(180, 600, 'sueloB2');
        // Definicion Zona 2
        platforms.create(1765, 920, 'suelo4');
        platforms.create(1859, 875, 'suelo5');
        platforms.create(2144, 960, 'suelo6');
        platforms.create(2429, 875, 'suelo5').setFlipX(true);
        platforms.create(2523, 920, 'suelo4').setFlipX(true);
        platforms.create(3085, 960, 'suelo9').setScale(0.9,1);
        platforms.create(1440, 600, 'sueloP3');
        platforms.create(1840, 450, 'sueloP3');
        platforms.create(2440, 450, 'sueloP3');
        platforms.create(2900, 590, 'sueloP4').setScale(0.9,1);
        platforms.create(2600, 550, 'sueloB2');
        platforms.create(3200, 330, 'sueloM1');
        // Definicion Zona 3
        platforms.create(3650, 890, 'suelo10');
        platforms.create(4173, 960, 'suelo11');
        platforms.create(3340, 600, 'sueloP3');
        platforms.create(3900, 250, 'sueloP1').setScale(1.7,1);
        platforms.create(4095, 410, 'sueloM1').setScale(1,0.6);
        platforms.create(3955, 570, 'sueloP3');
        platforms.create(4550, 582, 'sueloM1').setScale(1,1);
        platforms.create(4410, 770, 'sueloP3');
        // Definicion Zona 4
        platforms.create(5074, 959, 'suelo12');
        platforms.create(5595, 920, 'suelo4');
        platforms.create(5689, 875, 'suelo5');
        platforms.create(5974, 960, 'suelo6');
        platforms.create(6259, 875, 'suelo5').setFlipX(true);
        platforms.create(6353, 920, 'suelo4').setFlipX(true);
        platforms.create(6592, 960, 'suelo18');
        platforms.create(4786, 285, 'sueloP4').setScale(1.5,1);
        platforms.create(5686, 285, 'sueloP4').setScale(2,1);
        platforms.create(5354, 470, 'sueloM2').setScale(1,1.4);
        platforms.create(6350, 285, 'sueloP4').setScale(1.7,1);
        platforms.create(4965, 605, 'sueloP4')
        platforms.create(5340, 605, 'sueloP4')
        platforms.create(5800, 610, 'sueloB2');
        platforms.create(6100, 610, 'sueloB2');
        // Definicion Zona 5
        platforms.create(6924, 879, 'suelo19');
        platforms.create(7735, 960, 'suelo20');
        platforms.create(8444, 500, 'pared').setScale(1.5,1);
        platforms.create(7550, 30, 'suelo20').setFlipY(true).setScale(0.8,1);
        platforms.create(6980, 125, 'sueloM2');
        platforms.create(7050, 500, 'sueloP4');
        platforms.create(8038, 125, 'sueloM2');
        platforms.create(7287, 415, 'suelo5').setFlipX(true);
        platforms.create(7193, 460, 'suelo4');
        platforms.create(7430, 331, 'sueloP4');
        platforms.create(7771, 415, 'sueloM2');
        platforms.create(7630, 331, 'sueloP4');
        platforms.create(8038, 600, 'sueloM2');
        platforms.create(7802, 720, 'sueloP4');
        platforms.create(7250, 720, 'sueloP4');
        // Instanciacion de las monedas
        // Monedas Zona 1
        coins[0]=this.physics.add.sprite(615, 800, 'coin').setScale(2); 
        coins[1]=this.physics.add.sprite(370, 770, 'coin').setScale(2);
        coins[2]=this.physics.add.sprite(885, 890, 'coin').setScale(2);
        coins[3]=this.physics.add.sprite(1185, 890, 'coin').setScale(2);
        coins[4]=this.physics.add.sprite(835, 590, 'coin').setScale(2);
        coins[5]=this.physics.add.sprite(1095, 490, 'coin').setScale(2);
        coins[6]=this.physics.add.sprite(770, 320, 'coin').setScale(2);
        coins[7]=this.physics.add.sprite(420, 260, 'coin').setScale(2);
        coins[8]=this.physics.add.staticSprite(2910, 780, 'coin').setScale(2);

        //Instanciacion de los PowerUps
        // Power Ups Zona 1
        PowerUps[0]=this.physics.add.sprite(150, 100, 'PowerUp').setScale(3.5);
        PowerUps[1]=this.physics.add.sprite(180, 500, 'PowerUp').setScale(3.5);

        // Instanciacion de los jugadores
        player1 = this.physics.add.sprite(7850, 330, 'Hitt').setScale(0.3); // Creacion del jugador 1(cursors)
        player1.tipoPU = -1;
        player1.canDoubleJump = false
        player1.vel = 250;
        player1.numJump = 0;
        player1.fuerza = 8;
        player1.score = 0;
        player1.setGravityY(100);

        player1.setBounce(0.2); // Limites del jugador
        player1.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite(7500, 820, 'dude').setScale(3); // Creacion del jugador 2 (WASD)
        player2.tipoPU = -1;
        player2.canDoubleJump = false
        player2.vel = 300;
        player2.numJump = 0;
        player2.fuerza = 5;
        player2.score = 0;
        player2.setGravityY(100);

        player2.setBounce(0.2);// Limites del jugador
        player2.setCollideWorldBounds(true);

        // Instanciacion texto
        scoreText1 = this.add.text(0, 50, 'Hitt: 0', { fontSize: '50px', fill: '#000' }).setScrollFactor(0);
        scoreText2 = this.add.text(1700, 50, '0: Ufo', { fontSize: '50px', fill: '#000' }).setScrollFactor(0);
        this.add.image(70, 160, 'circuloPU').setScale(0.2).setScrollFactor(0); // Instanciacion de los circulos PU
        this.add.image(1900, 160, 'circuloPU').setScale(0.2).setScrollFactor(0); 

        // Instanciacion rocas
        roca1 = this.physics.add.sprite(3200, 770, 'rock').setScale(1.2).setBounce(0);

        // Muros rompibles
        breakW[0] = this.physics.add.staticImage(1300, 793, 'wall').setScale(1, 0.9);
        breakW[1] = this.physics.add.staticImage(2500, 280, 'wall').setScale(1, 0.9);
        breakW[2] = this.physics.add.staticImage(4100, 765, 'wall').setScale(1, 1.1);
        breakW[3] = this.physics.add.staticImage(4100, 58, 'wall').setScale(1, 1.1);
        breakW[4] = this.physics.add.staticImage(6100, 88, 'wall').setScale(1, 1.1);
        breakW[5] = this.physics.add.staticImage(6500, 88, 'wall').setScale(1, 1.1);
        breakW[6] = this.physics.add.staticImage(8038, 825, 'wall').setScale(1,0.7);
        for(let i = 0; i<breakW.length;i++){
            breakW[i].dureza=80;
            breakW[i].tocado = false;
        }
        // Pinchos
        pinchos[0] = this.physics.add.staticImage(106, 598, 'pincho1').setScale(1.3).setFlipX(true);
        pinchos[1] = this.physics.add.staticImage(255, 598, 'pincho1').setScale(1.3).setFlipX(false);
        pinchos[2] = this.physics.add.staticImage(1226, 640, 'pincho1').setScale(1.3).setFlipX(true);
        pinchos[3] = this.physics.add.staticImage(1226, 580, 'pincho1').setScale(1.3).setFlipX(true);
        pinchos[4] = this.physics.add.staticImage(1226, 520, 'pincho1').setScale(1.3).setFlipX(true);
        pinchos[5] = this.physics.add.staticImage(1226, 460, 'pincho1').setScale(1.3).setFlipX(true);
        pinchos[6] = this.physics.add.staticImage(2880, 892, 'pincho2').setScale(1.3);
        pinchos[7] = this.physics.add.staticImage(2930, 892, 'pincho2').setScale(1.3);
        pinchos[8] = this.physics.add.staticImage(2880, 660, 'pincho2').setScale(1.3).setFlipY(true);
        pinchos[9] = this.physics.add.staticImage(2930, 660, 'pincho2').setScale(1.3).setFlipY(true);
        pinchos[10] = this.physics.add.staticImage(3773, 890, 'pincho1').setScale(1.3);
        pinchos[11] = this.physics.add.staticImage(3773, 830, 'pincho1').setScale(1.3);
        pinchos[12] = this.physics.add.staticImage(3773, 770, 'pincho1').setScale(1.3);
        pinchos[13] = this.physics.add.staticImage(4800, 215, 'pincho2').setScale(1.3);
        pinchos[14] = this.physics.add.staticImage(4740, 215, 'pincho2').setScale(1.3);
        pinchos[15] = this.physics.add.staticImage(4860, 215, 'pincho2').setScale(1.3);
        pinchos[16] = this.physics.add.staticImage(5000, 890, 'pincho2').setScale(1.3);
        pinchos[17] = this.physics.add.staticImage(5060, 890, 'pincho2').setScale(1.3);
        pinchos[18] = this.physics.add.staticImage(5060, 675, 'pincho2').setScale(1.3).setFlipY(true);
        pinchos[19] = this.physics.add.staticImage(5000, 675, 'pincho2').setScale(1.3).setFlipY(true);
        pinchos[20] = this.physics.add.staticImage(7500, 262, 'pincho2').setScale(1.3);
        pinchos[21] = this.physics.add.staticImage(7560, 262, 'pincho2').setScale(1.3);
        pinchos[22] = this.physics.add.staticImage(7500, 892, 'pincho2').setScale(1.3);
        pinchos[23] = this.physics.add.staticImage(7560, 892, 'pincho2').setScale(1.3);
        pinchos[24] = this.physics.add.staticImage(8038, 448, 'pincho2').setScale(1.3);

//////////////////////////////////////////////////////////////////ANIMACIONES///////////////////////////////////////////////////////////////////////////
    // Carga la animacion de andar hacia la izquierda (Temporal)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    // Carga la animacion de darse la vuelta (Temporal)
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    // Carga la animacion de ir hacia la dcha (Temporal)
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
    // Carga la animacion de andar hacia la izquierda (Hitt)
    this.anims.create({
        key: 'leftHitt',
        frames: this.anims.generateFrameNumbers('Hitt', { start: 3, end: 5 }),
        frameRate: 6,
        repeat: -1
    });
    // Carga la animacion de darse la vuelta (Hitt)
    this.anims.create({
        key: 'turnHitt',
        frames: [ { key: 'Hitt', frame: 0 } ],
        frameRate: 20
    });
    // Carga la animacion de ir hacia la dcha (Hitt)
    this.anims.create({
        key: 'rightHitt',
        frames: this.anims.generateFrameNumbers('Hitt', { start: 0, end: 2 }),
        frameRate: 6,
        repeat: -1
    });
//////////////////////////////////////////////////////////////////////COLISIONES////////////////////////////////////////////////////////////////////////////
        this.physics.add.collider(player1, platforms); // Colisiones entre jugadores y entorno
        this.physics.add.collider(player2, platforms);
        for(let i = 0;i<coins.length;i++){ // Colisiones entre monedas y suelo
            this.physics.add.collider(platforms, coins[i]);
        }
        for(let i = 0;i<PowerUps.length;i++){ // Colisiones entre Power Ups y suelo
            this.physics.add.collider(platforms, PowerUps[i]);
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
        for(let i = 0;i<pinchos.length;i++){ // Colisiones entre los muros rompibles y jugador
            this.physics.add.overlap(player1, pinchos[i], pinchado, null, this);
            this.physics.add.overlap(player2, pinchos[i], pinchado, null, this);
        }
        this.physics.add.collider(roca1, platforms); 
        this.physics.add.collider(player2, roca1);
        this.physics.add.collider(player1, roca1);

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

        // Menu de Pause
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
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
                     Objeto1 = this.add.image(70, 160, 'snowball').setScale(0.1).setScrollFactor(0); 
                    break;
                case 1:
                     player1.tipoPU = 1;
                     Objeto1 = this.add.image(70, 160, 'electricBall').setScale(0.1).setScrollFactor(0); 
                    break;
                case 2:
                     player1.tipoPU = 2;
                     Objeto1 = this.add.image(70, 160, 'potion').setScale(0.1).setScrollFactor(0); 
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
                     Objeto2 = this.add.image(1900, 160, 'snowball').setScale(0.1).setScrollFactor(0); 
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
    function contacto(player, wall){
        wall.tocado = true;
    }
    function pinchado(player, pincho){
        if(player == player1){
            player1.vel = 130;
            player1.setTint(0xff0000);
            player1.setGravityY(500);
            this.time.addEvent({ delay: 1000, callback:normal, callbackScope: this});
        }else if (player == player2){
            player2.vel = 130;
            player2.setTint(0xff0000);
            player2.setGravityY(500);
            this.time.addEvent({ delay: 1000, callback:normal, callbackScope: this});
        }
    }
    function normal(){
        if(player1.vel == 130){
            player1.vel=250;
            player1.clearTint();
            player1.setGravityY(100);
        }else if(player2.vel == 130){
            player2.vel=300;
            player2.setGravityY(100);
            player2.clearTint();
        }
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

        player1.anims.play('leftHitt', true);
    }
    else if (this.keyL.isDown){
        player1.setVelocityX(player1.vel);

        player1.anims.play('rightHitt', true);
    }
    else{
        player1.setVelocityX(0);

        player1.anims.play('turnHitt');
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

    if(Phaser.Input.Keyboard.JustDown(this.keyESC)){ // Menu de pausa
        if(!paused){
            pauseText1 = this.add.text(800, 400, 'PAUSADO', { fontSize: '100px', color: "#000000",fontStyle: "bold"});
            pauseText2 = this.add.text(800, 600, '<PULSA ESC PARA REANUDAR>', { fontSize: '100px', color: "#000000",fontStyle: "bold"});
            player1.body.moves = false;
            player2.body.moves = false;
            paused=true;
        }else if(paused){
            pauseText1.destroy();
            pauseText2.destroy();
            player1.body.moves = true;
            player2.body.moves = true;
            paused = false;
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
    // Comprueba si el jugador rompe el muro y lo actualiza en consecuencia
    aux = inTouch();
    if(aux != undefined){
        if(Phaser.Input.Keyboard.JustDown(this.keyQ)){ // Interaccion con breakable Walls
            aux.dureza -= player2.fuerza;
            aux.tocado = false;
        }else if(Phaser.Input.Keyboard.JustDown(this.keyU)){
            aux.dureza -= player1.fuerza;
            aux.tocado = false;
        }
        if(aux.dureza<80 && aux.dureza > 60){
            aux.setTint(0xF0F720);
        }else if(aux.dureza<60 && aux.dureza > 40){
            aux.setTint(0xFF6A06);
        }else if(aux.dureza<40){
            aux.setTint(0xFF0000);
        } 
        if(aux.dureza<=0){
            aux.destroy();
        }
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
                player1.score += 1000;
            }else{
                player2.score += 1000;
            }
            scene.start("Scene2", { "points1": player1.score, "points2": player2.score });
        }
    }

    function congelado(){
        if(this.keyE.isDown){
            player1.setTint(0x0000ff); // pinta al jugador de azul
            player1.vel = 150;
        }else if(this.keyO.isDown){
            player2.setTint(0x0000ff); // pinta al jugador de azul
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
        player2.fuerza = 10;
    }
    function desinflado(){
        player2.clearTint();
        player2.fuerza=5;
    }
    function inTouch(){
        for(let i = 0;i<breakW.length;i++){
            if(breakW[i].tocado == true){
                return breakW[i];
            }
        }
    }
    }
});