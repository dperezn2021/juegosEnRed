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
    },

    create: function() {
    ///////////////////////////////////////////////////////////////INSTANCIACION////////////////////////////////////////////////////////////////////
        coins = []; // Crea el grupo de monedas
        PowerUps= [];
        ScoreP1 = 0;
        ScoreP2 = 0;
        tipoPU1 = -1;
        tipoPU2 = -1;
        vel1 = 300;
        vel2 = 300;

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
        PowerUps[0]=this.physics.add.sprite(600, 800, 'PowerUp').setScale(3);
        PowerUps[1]=this.physics.add.sprite(800, 800, 'PowerUp').setScale(3);

        // Instanciacion de los jugadores
        player1 = this.physics.add.sprite(0, 850, 'dude').setScale(4); // Creacion del jugador 1

        player1.setBounce(0.2); // Limites del jugador
        player1.setCollideWorldBounds(true);

        player2 = this.physics.add.sprite(100, 850, 'dude').setScale(4); // Creacion del jugador 2

        player2.setBounce(0.2);// Limites del jugador
        player2.setCollideWorldBounds(true);

        // Instanciacion texto
        scoreText1 = this.add.text(0, 50, 'Hitt: 0', { fontSize: '50px', fill: '#000' }).setScrollFactor(0);
        scoreText2 = this.add.text(1700, 50, '0: Ufo', { fontSize: '50px', fill: '#000' }).setScrollFactor(0);
        this.add.image(70, 160, 'circuloPU').setScale(0.2).setScrollFactor(0); // Instanciacion de los circulos PU
        this.add.image(1900, 160, 'circuloPU').setScale(0.2).setScrollFactor(0); 

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
            this.physics.add.collider(coins[i], suelo);
        }
        for(let i = 0;i<PowerUps.length;i++){
            this.physics.add.collider(PowerUps[i], suelo);
        }
        for(let i = 0;i<coins.length;i++){
            this.physics.add.collider(player1, coins[i], takeCoin, null, this);
            this.physics.add.collider(player2, coins[i], takeCoin, null, this);
        }
        for(let i = 0;i<PowerUps.length;i++){
            this.physics.add.collider(player1, PowerUps[i], takePU, null, this);
            this.physics.add.collider(player2, PowerUps[i], takePU, null, this);
        }
////////////////////////////////////////////////////////////////////INTERACCIONES///////////////////////////////////////////////////////////////////////////
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); // Teclas que utilizaremos
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
///////////////////////////////////////////////////////////////////////FUNCIONES////////////////////////////////////////////////////////////////////////////
    function takeCoin(player, coin){
        coin.disableBody(true, true);

        if(player == player1){
            ScoreP1 += 100; // Actualiza la puntuacion
            scoreText1.setText('Hitt: ' + ScoreP1);
        }else if (player == player2){
            ScoreP2 += 100; // Actualiza la puntuacion
            scoreText2.setText(ScoreP2+' : Ufo');
        }
    }
    function takePU(player, PU){
        PU.disableBody(true, true);

        if(player == player1){
            if(tipoPU1==-1){
            rand = Math.floor(Math.random() * 4);
            switch(rand){
                case 0:
                     tipoPU1 = 0;
                     Objeto1 = this.add.image(70, 160, 'snowball').setScale(2).setScrollFactor(0); 
                    break;
                case 1:
                     tipoPU1 = 1;
                     Objeto1 = this.add.image(70, 160, 'electricBall').setScale(0.1).setScrollFactor(0); 
                    break;
                case 2:
                     tipoPU1 = 2;
                     Objeto1 = this.add.image(70, 160, 'potion').setScale(2.3).setScrollFactor(0); 
                    break;
                case 3:
                     tipoPU1 = 3;
                     Objeto1 = this.add.image(70, 160, 'boots').setScale(0.3).setScrollFactor(0); 
                    break;
            }
            }
        }else if (player == player2){
            if(tipoPU2==-1){
            rand = Math.floor(Math.random() * 4);
            switch(rand){
                case 0:
                     tipoPU2 = 0;
                     Objeto2 = this.add.image(1900, 160, 'snowball').setScale(2).setScrollFactor(0); 
                    break;
                case 1:
                     tipoPU2 = 1;
                     Objeto2 = this.add.image(1900, 160, 'electricBall').setScale(0.1).setScrollFactor(0); 
                    break;
                case 2:
                     tipoPU2 = 2;
                     Objeto2 = this.add.image(1900, 160, 'battery').setScale(0.15).setScrollFactor(0); 
                    break;
                case 3:
                     tipoPU2 = 3;
                     Objeto2 = this.add.image(1900, 160, 'boots').setScale(0.3).setScrollFactor(0); 
                    break;
            }
            }
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
    if (cursors.left.isDown){ 
        player1.setVelocityX(-vel1);

        player1.anims.play('left', true);
    }
    else if (cursors.right.isDown){
        player1.setVelocityX(vel1);

        player1.anims.play('right', true);
    }
    else{
        player1.setVelocityX(0);

        player1.anims.play('turn');
    }

    if (cursors.up.isDown && player1.body.touching.down){
        player1.setVelocityY(-500);
    }

    // Controles player 2
    if (this.keyA.isDown){ // Interacciones W-A-S-D (Player2)
        player2.setVelocityX(-vel2);

        player2.anims.play('left', true);
    }
    else if (this.keyD.isDown){
        player2.setVelocityX(vel2);

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

    ///////////////////////////////////////////////////////////////COMPROBACIONES///////////////////////////////////////////////////////////////////////////
    cam.startFollow(Ahead()); // La camara sigue al jugador mas adelantado

    if(this.keyE.isDown){ // Accion jugador 1
        switch(tipoPU2){
            case 0:
                Objeto2.destroy();
                tipoPU2 = -1;
                this.time.addEvent({ delay: 0, callback:congelado, callbackScope: this});
                this.time.addEvent({ delay: 2500, callback:descongelado, callbackScope: this});
                break;
            case 1:
                Objeto2.destroy();
                tipoPU2 = -1;
                this.time.addEvent({ delay: 0, callback:paralizado, callbackScope: this});
                this.time.addEvent({ delay: 1500, callback:desparalizado, callbackScope: this});
                break;
            case 2:
                Objeto2.destroy();
                tipoPU2 = -1;
                break;
            case 3:
                Objeto2.destroy();
                tipoPU2 = -1;
                this.time.addEvent({ delay: 0, callback:paralizado, callbackScope: this});
                this.time.addEvent({ delay: 1500, callback:desparalizado, callbackScope: this});
                break;
        }
    }
    if(this.keyENTER.isDown){
        switch(tipoPU1){
            case 0:
                Objeto1.destroy();
                tipoPU1 = -1;
                this.time.addEvent({ delay: 0, callback:congelado, callbackScope: this});
                this.time.addEvent({ delay: 2500, callback:descongelado, callbackScope: this});
                break;
            case 1:
                Objeto1.destroy();
                tipoPU1 = -1;
                this.time.addEvent({ delay: 0, callback:paralizado, callbackScope: this});
                this.time.addEvent({ delay: 1500, callback:desparalizado, callbackScope: this});
                break;
            case 2:
                Objeto1.destroy();
                tipoPU1 = -1;
                break;
            case 3:
                Objeto1.destroy();
                tipoPU1 = -1;
                break;
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
                scene.start("Scene2", { "message": "Player 1 ha ganado" });
            }else{
                scene.start("Scene2", { "message": "Player 2 ha ganado" });
            }
        }
    }

    function congelado(){
        if(this.keyE.isDown){
            player1.setTint(0x0000ff); // pinta al jugador de rojo
            vel1 = 150;
        }else if(this.keyENTER.isDown){
            player2.setTint(0x0000ff); // pinta al jugador de rojo
            vel2 = 150;
        }
    }
    function descongelado(){
        if(vel1 == 150){
            player1.clearTint(); // pinta al jugador de rojo
            vel1 = 300;
        }else if(vel2 == 150){
            player2.clearTint(); // pinta al jugador de rojo
            vel2 = 300;
        }
    }
    function paralizado(){
        if(this.keyE.isDown){
            player1.setTint(0xffff00); // pinta al jugador de rojo
            vel1 = 0;
        }else if(this.keyENTER.isDown){
            player2.setTint(0xffff00); // pinta al jugador de rojo
            vel2 = 0;
        }
    }
    function desparalizado(){
        if(vel1 == 0){
            player1.clearTint(); // pinta al jugador de rojo
            vel1 = 300;
        }else if(vel2 == 0){
            player2.clearTint(); // pinta al jugador de rojo
            vel2 = 300;
        }
    }
    }
});