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

        //Carga de imagenes
        this.load.spritesheet('Hitt', 'assets/Partida/SpriteSheetHitt.png', { frameWidth: 315.5, frameHeight: 441 });
        this.load.spritesheet('coin', 'assets/Partida/coin.png', { frameWidth: 32, frameHeight: 32 });
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
        this.load.image('portal', 'assets/Partida/portal.png');
        this.load.image('lava1','assets/Tutorial/bloques/lava.png');
        this.load.image('agua1','assets/Tutorial/bloques/agua.png');
        this.load.image('medidorHitt', 'assets/Interfaz/medidorPuntosHitt.png');
        this.load.image('circuloPU', 'assets/Interfaz/CirculoPU.png');
        this.load.image('fondoTutorial','assets/Tutorial/fondo.png');
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
        this.load.image('hierba1','assets/Tutorial/bloques/hierbas/h1.png');
        this.load.image('hierba2','assets/Tutorial/bloques/hierbas/h2.png');
        this.load.image('hierba3','assets/Tutorial/bloques/hierbas/h3.png');
        this.load.image('hierba4','assets/Tutorial/bloques/hierbas/h4.png');
        this.load.image('hierba5','assets/Tutorial/bloques/hierbas/h5.png');
        
        //Sonidos 
        this.load.audio('Acoin', 'assets/Sonidos/cogerMoneda.mp3');
        this.load.audio('APU', 'assets/Sonidos/cogerPowerUp.mp3');
        this.load.audio('tirarPU', 'assets/Sonidos/tirarPowerUp.mp3');
        this.load.audio('saltar', 'assets/Sonidos/saltar.mp3');
        this.load.audio('pegarHitt', 'assets/Sonidos/hittPegando.mp3');
        this.load.audio('daño', 'assets/Sonidos/daño.mp3');
        this.load.audio('aguaSplash', 'assets/Sonidos/agua.mp3');
        this.load.audio('lavaSplash', 'assets/Sonidos/lava.mp3');
        this.load.audio('BGMusic', 'assets/MUSICAS/cancionJuego.mp3');
        //Carteles
        this.load.image('aguaLavaCartel','assets/Tutorial/carteles/aguaLava.png');
        this.load.image('interactuarCartel','assets/Tutorial/carteles/interactuar.png');
        this.load.image('izqDerCartel','assets/Tutorial/carteles/izqDer.png');
        this.load.image('objetosCartel','assets/Tutorial/carteles/objetos.png');
        this.load.image('pinchosCartel','assets/Tutorial/carteles/pinchos.png');
        this.load.image('PUCartel','assets/Tutorial/carteles/PU.png');
        this.load.image('saltoCartel','assets/Tutorial/carteles/salto.png');
        this.load.image('xCartel','assets/Tutorial/carteles/x.png');
        this.load.image('cartel','assets/Tutorial/carteles/cartel.png');
       
    },

    create: function() {
        //Fondo
        this.add.image(0, 0, 'fondoTutorial').setScale(1).setOrigin(0,0); // Creacion del fondo
        //Mundo
        this.physics.world.bounds.width = 4000; // Limite al tamaño del mundo
        this.physics.world.bounds.height = 1000;
        this.cameras.main.setBounds(0, 0, 4000, 1000); // Define los limites de la camara
        this.cameras.main.setBackgroundColor(0xffffff)

        ////////////////////////////////////////////////////////////INSTANCIACIONES////////////////////////////////////////////////////////////////////////
        coins = []; // Crea el grupo de monedas
        PowerUps= [];
        breakW = [];
        pinchos = [];
        PSaltos = [];
        carteles = [];
        //Carteles
        carteles[0] = this.physics.add.image(250, 504, 'cartel').setScale(0.4); 
        carteles[1] = this.physics.add.image(550, 504, 'cartel').setScale(0.4); 
        carteles[2] = this.physics.add.image(960, 571, 'cartel').setScale(0.4); 
        carteles[3] = this.physics.add.image(1600, 675, 'cartel').setScale(0.4); 
        carteles[4] = this.physics.add.image(2080, 500, 'cartel').setScale(0.4); 
        carteles[5] = this.physics.add.image(2500, 500, 'cartel').setScale(0.4); 
        carteles[6] = this.physics.add.image(3580, 50, 'cartel').setScale(0.4); 
        // Terreno
        platforms = this.physics.add.staticGroup();
        // Definicion Plataformas
        platforms.create(331.5, 790, 'floor1');
        platforms.create(958, 700, 'floor2');
        platforms.create(1279, 750, 'floor3');
        platforms.create(1990.5, 890, 'floor4');
        platforms.create(2750, 990, 'floor5').setScale(1.01,1);
        platforms.create(2937, 832, 'floor6');
        platforms.create(3316, 832, 'floor7');
        platforms.create(3713, 685, 'floor8');
        platforms.create(3803, 28, 'techo1');
        
        //Instanciacion decoracion
        this.add.image(331.5, 777, 'hierba1');
        this.add.image(957, 688, 'hierba2');
        this.add.image(1990.5, 876, 'hierba3');
        this.add.image(2749, 978, 'hierba4');
        this.add.image(3713, 671, 'hierba5');
        
        //Jugador
        paused = false;
        player1 = this.physics.add.sprite(90, 430, 'Hitt').setScale(0.3); // Creacion del jugador 1
        player1.tipoPU = -1;
        player1.canDoubleJump = false
        player1.vel = 250;
        player1.numJump = 0;
        player1.fuerza = 8;
        player1.score = 0;
        player1.setGravityY(150);
        player1.setBounce(0.05); // Limites del jugador
        player1.setCollideWorldBounds(true);
        

        //Monedas
        coins[0]=this.physics.add.sprite(1900, 100, 'coin').setScale(2); 
        coins[1]=this.physics.add.sprite(2938, 455, 'coin').setScale(2);

        //PowerUps
        PowerUps[0]=this.physics.add.staticSprite(2300, 600, 'PowerUp').setScale(1.5);

        // Instanciacion Interactuables
        breakW[0] = this.physics.add.staticImage(3700, 183, 'wall');
        for(let i = 0; i<breakW.length;i++){
            breakW[i].dureza=80;
            breakW[i].tocado = false;
        }

        //Objetos
        portal = this.physics.add.staticImage(3900, 170, 'portal').setScale(1);
        agua = this.physics.add.staticSprite(948, 920, 'agua1');
        lava = this.physics.add.staticSprite(3125.5, 920, 'lava1');
        PSaltos[0] = this.physics.add.staticImage(3340, 651, 'PSalto').setScale(1.5);

        // Pinchos
        pinchos[0] = this.physics.add.staticImage(1450, 698.5, 'pincho2');
        pinchos[1] = this.physics.add.staticImage(1494, 698.5, 'pincho2');
        pinchos[2] = this.physics.add.staticImage(1538, 698.5, 'pincho2');
        
    
        //Instanciacion carteles
        //CARTEL 1
        c1 = carteles[0];
        c1.setInteractive();
        cartel1 = this.add.image(900, 575, 'izqDerCartel');
        cartel1.visible = false;
        c1.on('pointerdown', function ()
        {
            cartel1.visible = true;
            setTimeout(ocultarCartel1, 2000);
        });
        //CARTEL 2
        c2 = carteles[1];
        c2.setInteractive();
        cartel2 = this.add.image(900, 575, 'saltoCartel');
        cartel2.visible = false;
        c2.on('pointerdown', function ()
        {
            cartel2.visible = true;
            setTimeout(ocultarCartel2, 2000);
        });
        //CARTEL 3
        c3 = carteles[2];
        c3.setInteractive();
        cartel3 = this.add.image(900, 575, 'aguaLavaCartel');
        cartel3.visible = false;
        c3.on('pointerdown', function ()
        {
            cartel3.visible = true;
            setTimeout(ocultarCartel3, 2000);
        });
        //CARTEL 4
        c4 = carteles[3];
        c4.setInteractive();
        cartel4 = this.add.image(1550, 575, 'pinchosCartel');
        cartel4.visible = false;
        c4.on('pointerdown', function ()
        {
            cartel4.visible = true;
            setTimeout(ocultarCartel4, 2500);
        });
        //CARTEL 5
        c5 = carteles[4];
        c5.setInteractive();
        cartel5 = this.add.image(1800, 575, 'objetosCartel');
        cartel5.visible = false;
        c5.on('pointerdown', function ()
        {
            cartel5.visible = true;
            setTimeout(ocultarCartel5, 2500);
        });
        //CARTEL 6
        c6 = carteles[5];
        c6.setInteractive();
        cartel6 = this.add.image(2200, 575, 'PUCartel');
        cartel6.visible = false;
        c6.on('pointerdown', function ()
        {
            cartel6.visible = true;
            setTimeout(ocultarCartel6, 2000);
        });
        //CARTEL 7
        c7 = carteles[6];
        c7.setInteractive();
        cartel7 = this.add.image(3125, 575, 'interactuarCartel');
        cartel7.visible = false;
        c7.on('pointerdown', function ()
        {
            cartel7.visible = true;
            setTimeout(ocultarCartel7, 2000);
        });

       
        // Instanciacion texto
        this.physics.add.staticImage(200, 130, 'medidorHitt').setScale(0.3).setScrollFactor(0);
        scoreText1 = this.add.text(200, 85, '0', { fontSize: '70px', fill: '#ffffff',fontFamily: 'Impact, fantasy' }).setScrollFactor(0);
        this.add.image(440, 120, 'circuloPU').setScale(0.2).setScrollFactor(0); // Instanciacion de los circulos PU

        
        //Sonidos
        Acoin = this.sound.add('Acoin',{volume: 0.15});
        APoU = this.sound.add('APU', {volume: 0.5});
        tirarPU = this.sound.add('tirarPU', {volume: 0.5});
        saltar = this.sound.add('saltar', {volume: 0.05});
        pegarHitt = this.sound.add('pegarHitt', {volume: 0.5});
        daño = this.sound.add('daño', {volume: 0.3});
        aguaSplash = this.sound.add('aguaSplash', {volume: 0.5});
        lavaSplash = this.sound.add('lavaSplash', {volume: 0.5});
        
        backgroundMusic.stop();
        backgroundMusic = this.sound.add('BGMusic', {volume: 0.3});
        backgroundMusic.loop = true;
        backgroundMusic.play();

        ///////////////////////////////////////////////////////////////COLISIONES///////////////////////////////////////////////////////////////
        this.physics.add.collider(player1, platforms); // Colisiones entre jugadores y entorno
        for(let i = 0;i<coins.length;i++){ // Colisiones entre monedas y suelo
            this.physics.add.collider(platforms, coins[i]);
        }
        for(let i = 0;i<PowerUps.length;i++){ // Colisiones entre Power Ups y suelo
            this.physics.add.collider(platforms, PowerUps[i]);
        }
        for(let i = 0;i<carteles.length;i++){ // Colisiones entre carteles y suelo
            this.physics.add.collider(platforms, carteles[i]);
        }
        for(let i = 0;i<coins.length;i++){ // Colisiones entre monedas y jugador
            this.physics.add.overlap(player1, coins[i], takeCoin, null, this);
        }
        for(let i = 0;i<PowerUps.length;i++){ // Colisiones entre PowerUps y jugador
            this.physics.add.overlap(player1, PowerUps[i], takePU, null, this);
        }
        for(let i = 0;i<breakW.length;i++){ // Colisiones entre los muros rompibles y jugador
            this.physics.add.collider(player1, breakW[i], contacto, null, this);
        }
        for(let i = 0;i<pinchos.length;i++){ // Colisiones entre los muros rompibles y jugador
            this.physics.add.overlap(player1, pinchos[i], pinchado, null, this);
        }
        for(let i = 0;i<PSaltos.length;i++){ // Colisiones entre los saltos y jugador
            this.physics.add.overlap(player1, PSaltos[i], paArriba, null, this);
        }

        this.physics.add.collider(player1, portal, win, null, this);
        this.physics.add.collider(player1, agua, mojado, null, this);
        this.physics.add.collider(player1, lava, quemado, null, this);
        
        
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
    // Animacion giro de la moneda
    this.anims.create({ 
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
        frameRate: 16,
        repeat: -1
    });
        ////////////////////////////////////////////////////////////CONTROLES/////////////////////////////////////////////////////////////////////////
        // Controles
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); // Arriba
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // Izquierda
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // Derecha
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Power Up
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q); // Interactuar
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // Pausa
        
        ///////////////////////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////
        function takeCoin(player, coin){
            coin.disableBody(true, true);
            Acoin.play();
            player1.score += 100; // Actualiza la puntuacion
            scoreText1.setText (player1.score);
            
        }
        function takePU(player, PU){
            PU.disableBody(true, true);
            APoU.play();
                if(player1.tipoPU==-1){
                rand = Math.floor(Math.random() * 4);
                switch(rand){
                    case 0:
                         player1.tipoPU = 0;
                         Objeto1 = this.add.image(440, 120, 'snowball').setScale(0.1).setScrollFactor(0); 
                        break;
                    case 1:
                         player1.tipoPU = 1;
                         Objeto1 = this.add.image(440, 120, 'electricBall').setScale(0.1).setScrollFactor(0); 
                        break;
                    case 2:
                         player1.tipoPU = 2;
                         Objeto1 = this.add.image(440, 120, 'potion').setScale(0.1).setScrollFactor(0); 
                        break;
                    case 3:
                         player1.tipoPU = 3;
                         Objeto1 = this.add.image(440, 120, 'boots').setScale(0.1).setScrollFactor(0); 
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
            daño.play();
        }
        function normal(){
            player1.vel=250;
            player1.clearTint();
            player1.setGravityY(100);
        }
        function win(player, portal){
            if(player == player1){
                player1.score += 2000;
            }
            backgroundMusic.stop();
            this.scene.start("RegScene");
        }    
        function paArriba(player){
            if(player == player1){
                player1.setVelocityY(-700);
                saltar.play();
            }
        }
        function mojado(player){
            if(player == player1){
                aguaSplash.play();
                player1.body.position.x = 500;
                player1.body.position.y = 370;
            }
        }
        function quemado(player){
            if(player == player1){
                lavaSplash.play();
                player1.body.position.x = 2850;
                player1.body.position.y = 455;
            }
        }
        function ocultarCartel1(){
            cartel1.visible = false;
        }
        function ocultarCartel2(){
            cartel2.visible = false;
        }
        function ocultarCartel3(){
            cartel3.visible = false;
        }
        function ocultarCartel4(){
            cartel4.visible = false;
        }
        function ocultarCartel5(){
            cartel5.visible = false;
        }
        function ocultarCartel6(){
            cartel6.visible = false;
        }
        function ocultarCartel7(){
            cartel7.visible = false;
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
              saltar.play();
            } else if (player1.numJump>0 && player1.canDoubleJump) {
                player1.canDoubleJump = false;
                player1.body.setVelocityY(-400);
                saltar.play();
              player1.numJump--;
            }
        }

        ///////////////////////////////////////////////////////////////COMPROBACIONES///////////////////////////////////////////////////////////////////////////
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
                    this.time.addEvent({ delay: 0, callback:correr, callbackScope: this});
                    this.time.addEvent({ delay: 2500, callback:parar, callbackScope: this});
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

        // Comprueba si el jugador rompe el muro y lo actualiza en consecuencia
        aux = inTouch();
        if(aux != undefined){
            if(Phaser.Input.Keyboard.JustDown(this.keyQ)){ // Interaccion con breakable Walls
                pegarHitt.play();
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

        ////////////////////////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////////////////////////
        function congelado(){
            tirarPU.play();
            if(this.keyE.isDown){
                player1.setTint(0x0000ff); // pinta al jugador de azul
                player1.vel = 150;
            }
        }
        function descongelado(){
            if(player1.vel == 150){
                player1.clearTint(); // pinta al jugador de rojo
                player1.vel = 250;
            }
        }
        function paralizado(){
            tirarPU.play();
            if(this.keyE.isDown){
                player1.setTint(0xffff00); // pinta al jugador de rojo
                player1.vel = 0;
            }
        }
        function desparalizado(){
            if(player1.vel == 0){
                player1.clearTint(); // pinta al jugador de rojo
                player1.vel = 250;
            }
        }
        function correr(){
            tirarPU.play();
            player1.setTint(0x00FFFF);
            player1.vel = 400;
        }
        function parar(){
            player1.clearTint();
            player1.vel = 300;
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
