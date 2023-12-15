var logInScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "logInScene" });
    },

    init: function() {

    },

    preload: function() {
        this.load.image('fondo','assets/Background/Menu_Final.jpg');
        this.load.image('fondoCarga','assets/Background/pantallaCarga.jpg');
        this.load.image('BOk','assets/Menu/BotonAceptar.png');
        this.load.image('volver','assets/Menu/BotonVolver.png');
        this.load.html('nameform', 'assets/nameform.html');
        this.load.spritesheet('Hitt', 'assets/Partida/SpriteSheetHitt.png', { frameWidth: 315.5, frameHeight: 441 });
        this.load.spritesheet('Ufo', 'assets/Partida/spritesheetUFO.png', { frameWidth: 420, frameHeight: 380 });
    },

    create: function() {
		listo1 = false;
		listo2 = false;
        var IdP1;
        var IdP2;
		ipLocal = "http://127.0.0.1:8080/";
        this.add.image(900, 500, 'fondo').setScale(0.85, 0.85);

        imgTutoBN = this.add.image(500, 550, 'fondo1').setScale(0.8);
        imgPartBN = this.add.image(1300, 550, 'fondo2').setScale(0.8);

        volver = this.add.image(120, 80, 'volver').setScale(1.2);

        ready1 = this.add.image(500, 750, 'BOk').setScale(1.5);
        ready2 = this.add.image(1320, 750, 'BOk').setScale(1.5);
        
        player2 = this.add.sprite(1320, 580, 'Hitt').setScale(1);
        player2.setVisible(false);
        
        player1 = this.add.sprite(500, 580, 'Ufo').setScale(1);
        player1.setVisible(false);


        Id1 = this.add.text(250, 200, 'Nombre del jugador 1', { color: 'white', fontSize: '60px ',fontFamily: 'Impact, fantasy'});
        Id2 = this.add.text(1050, 200, 'Nombre del jugador 2', { color: 'white', fontSize: '60px ',fontFamily: 'Impact, fantasy'});

        Pw1 = this.add.text(270, 400, 'Clave del jugador 1', { color: 'white', fontSize: '60px ',fontFamily: 'Impact, fantasy'});
        Pw2 = this.add.text(1070, 400, 'Clave del jugador 2', { color: 'white', fontSize: '60px ',fontFamily: 'Impact, fantasy'});

        const elementId1 = this.add.dom(500, 320).createFromCache('nameform');
        const elementId2 = this.add.dom(1320, 320).createFromCache('nameform');
        const elementPw1 = this.add.dom(500, 520).createFromCache('nameform');
        const elementPw2 = this.add.dom(1320, 520).createFromCache('nameform');

        ready1.setInteractive();
        ready2.setInteractive();
        volver.setInteractive();

        this.anims.create({
            key: 'leftHitt',
            frames: this.anims.generateFrameNumbers('Hitt', { start: 3, end: 5 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'rightUfo',
            frames: this.anims.generateFrameNumbers('Ufo', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });
        player2.anims.play('leftHitt', true);
        player1.anims.play('rightUfo', true);

        ready1.on("pointerdown",()=>{
            const inputTextId = elementId1.getChildByName('nameField');
            const inputTextPw = elementPw1.getChildByName('nameField');

                if (inputTextId.value !== '' && inputTextPw.value !== '' )
                {
                    $.ajax({
						
					method: "POST",
					
					url:ipLocal+"usuario",
					
					data: JSON.stringify({nombre: inputTextId.value, password: inputTextPw.value}),
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
						console.log(textStatus+" "+jqXHR.statusCode());
						if(textStatus == "success"){
                            IdP1 = inputTextId.value;
							elementId1.setVisible(false);
                    		elementPw1.setVisible(false);
                    		Id1.destroy();
                   		 	Pw1.destroy();
                    		ready1.destroy();
                    		player1.setVisible(true);
                    		listo1 = true;
						}
					}).fail(function(data){
						alert("Usuario invalido o ya registrado.");
					});
                }
        })

        ready1.on("pointerover",()=>{
            ready1.setScale(2);
        })

        ready1.on("pointerout",()=>{
            ready1.setScale(1.5);
        })

        ready2.on("pointerdown",()=>{
            const inputTextId = elementId2.getChildByName('nameField');
            const inputTextPw = elementPw2.getChildByName('nameField');

                if (inputTextId.value !== '' && inputTextPw.value !== '' )
                {
					$.ajax({
						
					method: "POST",
					
					url:ipLocal+"usuario",
					
					data: JSON.stringify({nombre: inputTextId.value, password: inputTextPw.value}),
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(textStatus+" "+jqXHR.statusCode());
						console.log(data);
						if(textStatus == "success"){
                            IdP2 = inputTextId.value;
							elementId2.setVisible(false);
                    		elementPw2.setVisible(false);
                    		Id2.destroy();
                   		 	Pw2.destroy();
                    		ready2.destroy();
                    		player2.setVisible(true);
                    		listo2 = true;
						}
					}).fail(function(data){
						alert("Usuario invalido o ya registrado.");
					});
                }
        })

        ready2.on("pointerover",()=>{
            ready2.setScale(2);
        })

        ready2.on("pointerout",()=>{
            ready2.setScale(1.5);
        })

        volver.on("pointerdown",()=>{
            this.scene.start("ElecScene");
        })

        volver.on("pointerover",()=>{
            volver.setScale(1.6);
        })

        volver.on("pointerout",()=>{
            volver.setScale(1.2);
        })
    },

    update: function() {
		if(listo1 && listo2){
            backgroundMusic.stop();
            volver.destroy();
			this.scene.start("Scene1");
		}
    }
});