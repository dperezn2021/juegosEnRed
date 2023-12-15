var tutorialScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "tutorialScene" });
    },

    init: function() {},

    preload: function() {
         // Pantalla de carga
         this.add.image(900, 500, 'fondoCarga');

         var percentText = this.make.text({
             x: 1720,
             y: 960,
             text: '0%',
             style: {
                 fontSize: 70,
                 fill: '#ffffff',
                 fontFamily: 'Impact, fantasy'
             }
         });
         percentText.setOrigin(0.5, 0.5);
 
         this.load.on('progress', function (value) {
             console.log(value);
             percentText.setText(parseInt(value * 100) + '%');
         });
                     
         this.load.on('fileprogress', function (file) {
             console.log(file.src);
         });
         this.load.on('complete', function () {
             console.log('complete');
             percentText.destroy();
         });

         // Carga de imagenes
        this.load.spritesheet('Hitt', 'assets/Partida/SpriteSheetHitt.png', { frameWidth: 315.5, frameHeight: 441 });
        this.load.spritesheet('coin', 'assets/Partida/coin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('wall','assets/Partida/paredRompible.png');
        this.load.image('circuloPU', 'assets/Interfaz/CirculoPU.png');
        this.load.image('snowball', 'assets/Interfaz/BoladehieloPU.png');
        this.load.image('electricBall', 'assets/Interfaz/RayoParalizantePU.png');
        this.load.image('potion', 'assets/Interfaz/PocionHittPU.png');
        this.load.image('boots', 'assets/Interfaz/BotasSaltarinasPU.png');
        this.load.image('pincho2', 'assets/Partida/pincho2.png');
        this.load.image('PSalto', 'assets/Partida/salto.png');
        this.load.image('PowerUp', 'assets/Partida/powerUp.png');
        this.load.image('lava1','assets/Tutorial/bloques/lava.png');
        this.load.image('floor1','assets/Tutorial/bloques/s1.png');
        this.load.image('agua1','assets/Tutorial/bloques/agua.png');
        // Terreno
        this.load.image('floor1','assets/Tutorial/bloques/s1.png');
        this.load.image('floor2','assets/Tutorial/bloques/s2.png');
        this.load.image('floor3','assets/Tutorial/bloques/s3.png');
        this.load.image('floor4','assets/Tutorial/bloques/s4.png');
        this.load.image('floor5','assets/Tutorial/bloques/s5.png');
        this.load.image('floor6','assets/Tutorial/bloques/s6.png');
        this.load.image('floor7','assets/Tutorial/bloques/s7.png');
        this.load.image('floor8','assets/Tutorial/bloques/s8.png');
        this.load.image('techo1','assets/Tutorial/bloques/t1.png');
        //Sonidos 
        this.load.audio('Acoin', 'assets/Sonidos/cogerMoneda.mp3');
        this.load.audio('APU', 'assets/Sonidos/cogerPowerUp.mp3');
        this.load.audio('tirarPU', 'assets/Sonidos/tirarPowerUp.mp3');
        
    },

    create: function() {
        this.physics.world.bounds.width = 4000; // Limite al tamaño del mundo
        this.physics.world.bounds.height = 1000;
        this.cameras.main.setBounds(0, 0,1990,1000); // Define los limites de la camara
        this.cameras.main.setBackgroundColor(0xffffff)

        ////////////////////////////////////////////////////////////INSTANCIACIONES////////////////////////////////////////////////////////////////////////
        player1 = this.physics.add.sprite(800, 730, 'Hitt').setScale(0.3); // Creacion del jugador 1
        player1.tipoPU = -1;
        player1.canDoubleJump = false
        player1.vel = 250;
        player1.numJump = 0;
        player1.fuerza = 8;
        player1.score = 0;
        player1.setGravityY(100);

        player1.setBounce(0.2); // Limites del jugador
        player1.setCollideWorldBounds(true);

        scoreText1 = this.add.text(0, 50, 'Hitt: 0', { fontSize: '50px', fill: '#000',fontFamily: 'Impact, fantasy' }).setScrollFactor(0);

        Acoin = this.sound.add('Acoin',{volume: 0.3});
        APoU = this.sound.add('APU', {volume: 0.5});
        tirarPU = this.sound.add('tirarPU', {volume: 0.5});

        // Terreno
        platforms = this.physics.add.staticGroup(); // Definicion del grupo platforms
        
        platforms.create(135, 960, 'suelo3');
        platforms.create(1180, 960, 'suelo3');
        ///////////////////////////////////////////////////////////////COLISIONES///////////////////////////////////////////////////////////////
        this.physics.add.collider(player1, platforms); // Colisiones entre jugadores y entorno
        ///////////////////////////////////////////////////////////////ANIMACIONES//////////////////////////////////////////////////////////////
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
        ////////////////////////////////////////////////////////////CONTROLES/////////////////////////////////////////////////////////////////////////
         // Controles
         this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Arriba
         this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Izquierda
         this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Derecha
         this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Power Up
         this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q); // Interactuar
        
        ///////////////////////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////
        function takeCoin(player, coin){
            coin.disableBody(true, true);
            Acoin.play();
            player1.score += 100; // Actualiza la puntuacion
            scoreText1.setText('Hitt: ' + player1.score);
            
        }
        function takePU(player, PU){
            PU.disableBody(true, true);
            APoU.play();
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
                         Objeto1 = this.add.image(70, 160, 'boots').setScale(0.1).setScrollFactor(0); 
                        break;
            }
            }
        }
        function contacto(player, wall){
            wall.tocado = true;
        }
        function pinchado(player, pincho){
                player1.vel = 130;
                player1.setTint(0xff0000);
                player1.setGravityY(500);
                this.time.addEvent({ delay: 1000, callback:normal, callbackScope: this});
        }
        function normal(){
                player1.vel=250;
                player1.clearTint();
                player1.setGravityY(100);
        }
    },

    update: function() {
        var cam = this.cameras.main;
        var scene = this.scene;
        // Controles 
        if (this.keyA.isDown){ // Interacciones W-A-S-D
            player1.setVelocityX(-player1.vel);
    
            player1.anims.play('leftHitt', true);
        }
        else if (this.keyD.isDown){
            player1.setVelocityX(player1.vel);
    
            player1.anims.play('rightHitt', true);
        }
        else{
            player1.setVelocityX(0);
    
            player1.anims.play('turnHitt');
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
            if (player1.body.touching.down) {
              player1.canDoubleJump = true;
              player1.body.setVelocityY(-400);
            } else if (player1.numJump>0 && player1.canDoubleJump) {
              player1.canDoubleJump = false;
              player1.body.setVelocityY(-400);
              player1.numJump--;
            }
        }
        
        cam.centerOnX(player1.body.position.x);

    if(this.keyE.isDown){ // Accion jugador 
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
                this.time.addEvent({ delay: 0, callback:esteroides, callbackScope: this});
                this.time.addEvent({ delay: 2500, callback:desinflado, callbackScope: this});
                player1.tipoPU = -1;
                break;
            case 3:
                Objeto1.destroy();
                player1.tipoPU = -1;
                tirarPU.play();
                player1.numJump = 10;
                break;
        }
    }
    }
});