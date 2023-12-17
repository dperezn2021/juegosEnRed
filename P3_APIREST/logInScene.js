var logInScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "logInScene" });
    },

    init: function() {

    },

    preload: function() {
        this.load.image('fondoSL','assets/Menu/InterfazNombreYContrasena.jpg');
        this.load.image('fondoCarga','assets/Background/pantallaCarga.jpg');
        this.load.image('BOkHitt','assets/Menu/JugarConHiit.png');
        this.load.image('BOkUFO','assets/Menu/JugarConUFO.png');
        this.load.image('marcoHitt','assets/Menu/MarcoRojo.png');
        this.load.image('marcoUFO','assets/Menu/MarcoVerde.png');
        this.load.image('vacioHitt','assets/Menu/Fondo Hitt.jpg');
        this.load.image('vacioUFO','assets/Menu/Fondo Ufo.jpg');
        this.load.image('volver','assets/Menu/BotonVolver.png');
        this.load.html('nameform', 'assets/nameform.html');
        this.load.spritesheet('Hitt', 'assets/Partida/SpriteSheetHitt.png', { frameWidth: 315.5, frameHeight: 441 });
        this.load.spritesheet('Ufo', 'assets/Partida/spritesheetUFO.png', { frameWidth: 420, frameHeight: 380 });
    },

    create: function() {
		listo1 = false;
		listo2 = false;
		ipLocal = "http://127.0.0.1:8080/";
        this.add.image(900, 500, 'fondoSL').setScale(1);


        ready1 = this.add.image(450, 770, 'BOkHitt').setScale(1);
        ready2 = this.add.image(1360, 770, 'BOkUFO').setScale(1);
        
        vacioHitt = this.add.image(450, 500, 'vacioHitt').setScale(1);
        vacioUfo = this.add.image(1350, 500, 'vacioUFO').setScale(1);
        vacioHitt.setVisible(false);
        vacioUfo.setVisible(false);
        
        volver = this.add.image(120, 80, 'volver').setScale(1.2);
        
        player2 = this.add.sprite(480, 580, 'Hitt').setScale(1.2);
        player2.setVisible(false);
        
        player1 = this.add.sprite(1340, 580, 'Ufo').setScale(1.2);
        player1.setVisible(false);

        const elementId1 = this.add.dom(450, 300).createFromCache('nameform');
        const elementId2 = this.add.dom(1360, 300).createFromCache('nameform');
        const elementPw1 = this.add.dom(450, 550).createFromCache('nameform');
        const elementPw2 = this.add.dom(1360, 550).createFromCache('nameform');

        marcoHitt1 = this.add.image(450, 300, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO1 = this.add.image(1360, 550, 'marcoUFO').setScale(1.15,1.2);
        marcoHitt2 = this.add.image(450, 550, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO2 = this.add.image(1360, 300, 'marcoUFO').setScale(1.15,1.2);

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
                    		ready1.destroy();
                    		marcoHitt1.destroy();
                    		marcoHitt2.destroy();
                    		vacioHitt.setVisible(true);
                    		player2.setVisible(true);
                    		listo1 = true;
						}
					}).fail(function(data){
						alert("Usuario invalido o ya registrado.");
					});
                }
        })

        ready1.on("pointerover",()=>{
            ready1.setScale(1.2);
        })

        ready1.on("pointerout",()=>{
            ready1.setScale(1);
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
                    		ready2.destroy();
                    		marcoUFO1.destroy();
                    		marcoUFO2.destroy();
                    		vacioUfo.setVisible(true);
                    		player1.setVisible(true);
                    		listo2 = true;
						}
					}).fail(function(data){
						alert("Usuario invalido o ya registrado.");
					});
                }
        })

        ready2.on("pointerover",()=>{
            ready2.setScale(1.2);
        })

        ready2.on("pointerout",()=>{
            ready2.setScale(1);
        })

        volver.on("pointerdown",()=>{
            this.scene.start("RegScene");
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
			 this.scene.start("Scene1", {"IdP1":IdP1, "IdP2": IdP2});
		}
    }
});