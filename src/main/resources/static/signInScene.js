var signInScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "signInScene" });
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
        this.load.image('botonBorrar','assets/Menu/borrarUsuario.png');
        this.load.image('vacioUFO','assets/Menu/Fondo Ufo.jpg');
        this.load.image('volver','assets/Menu/BotonVolver.png');
        this.load.image('seguroBorrar','assets/Menu/seguroBorrar.png');
        this.load.image('aceptarBorrar','assets/Menu/aceptarBorrar.png');
        this.load.image('cancelarBorrar','assets/Menu/cancelarBorrar.png');
        this.load.html('nameform', 'assets/nombre.html');
        this.load.html('passform', 'assets/contra.html');
        this.load.spritesheet('Hitt', 'assets/Partida/SpriteSheetHitt.png', { frameWidth: 315.5, frameHeight: 441 });
        this.load.spritesheet('Ufo', 'assets/Partida/spritesheetUFO.png', { frameWidth: 420, frameHeight: 380 });
    },

    create: function() {
		listo1 = false;
		listo2 = false;
		fetch('/api/getIp')
    			.then(response => response.text())
    			.then(data => {
				ipLocal = "http://"+data+":8080/"
        		console.log(data); 
    	});
		//ipLocal = "http://127.0.0.1:8080/";
        this.add.image(900, 500, 'fondoSL');

        ready1 = this.add.image(450, 770, 'BOkHitt').setScale(1);
        ready2 = this.add.image(1360, 770, 'BOkUFO').setScale(1);
        borrar1 = this.add.image(720, 920, 'botonBorrar').setScale(0.3);
        borrar2 = this.add.image(1620, 920, 'botonBorrar').setScale(0.3);

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
        const elementPw1 = this.add.dom(450, 550).createFromCache('passform');
        const elementPw2 = this.add.dom(1360, 550).createFromCache('passform');

        marcoHitt1 = this.add.image(450, 300, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO1 = this.add.image(1360, 550, 'marcoUFO').setScale(1.15,1.2);
        marcoHitt2 = this.add.image(450, 550, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO2 = this.add.image(1360, 300, 'marcoUFO').setScale(1.15,1.2);
        
        seguroBorrar1 = this.add.image(450, 780, 'seguroBorrar').setScale(0.5);
        seguroBorrar1.setVisible(false);
        aceptar1 = this.add.image(270, 900, 'aceptarBorrar').setScale(0.3);
        cancelar1 = this.add.image(630, 900, 'cancelarBorrar').setScale(0.3);
        aceptar1.setVisible(false);
        cancelar1.setVisible(false);
        
        seguroBorrar2 = this.add.image(1350, 780, 'seguroBorrar').setScale(0.5);
        seguroBorrar2.setVisible(false);
        aceptar2 = this.add.image(1170, 900, 'aceptarBorrar').setScale(0.3);
        cancelar2 = this.add.image(1530, 900, 'cancelarBorrar').setScale(0.3);
        aceptar2.setVisible(false);
        cancelar2.setVisible(false);

        ready1.setInteractive();
        ready2.setInteractive();
        volver.setInteractive();
        borrar1.setInteractive();
        borrar2.setInteractive();
        aceptar1.setInteractive();
        cancelar1.setInteractive();
        aceptar2.setInteractive();
        cancelar2.setInteractive();

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
            const inputTextPw = elementPw1.getChildByName('password');
            
                if (inputTextId.value !== '' && inputTextPw.value !== '' )
                {
                    $.ajax({
						
					method: "GET",
					
					url:ipLocal+"usuario/"+inputTextId.value,
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
						console.log(inputTextPw.value);
						console.log(textStatus+" "+jqXHR.statusCode());
						if(textStatus == "success" && inputTextPw.value == data.password){
                            IdP1 = inputTextId.value;
							elementId1.setVisible(false);
                    		elementPw1.setVisible(false);
                    		ready1.destroy();
                    		marcoHitt1.destroy();
                    		marcoHitt2.destroy();
                    		vacioHitt.setVisible(true);
                    		player2.setVisible(true);
                    		listo1 = true;
						}else{
							alert("Contraseña del jugador 1 incorrecta. ");
						}
					}).fail(function(data){
						alert("Usuario invalido o no registrado");
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
            const inputTextPw = elementPw2.getChildByName('password');

                if (inputTextId.value !== '' && inputTextPw.value !== '' )
                {
					$.ajax({
						
					method: "GET",
					
					url:ipLocal+"usuario/"+inputTextId.value,
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
						console.log(inputTextPw.value);
						console.log(textStatus+" "+jqXHR.statusCode());
						if(textStatus == "success" && inputTextPw.value == data.password){
                            IdP2 = inputTextId.value;
							elementId2.setVisible(false);
                    		elementPw2.setVisible(false);
                    		ready2.destroy();
                    		marcoUFO1.destroy();
                    		marcoUFO2.destroy();
                    		vacioUfo.setVisible(true);
                    		player1.setVisible(true);
                    		listo2 = true;
						}else{
							alert("Contraseña del jugador 2 incorrecta. ");
							}
					}).fail(function(data, textStatus, jqXHR){
						alert("Usuario invalido o no registrado");
					});
                }
        })

        ready2.on("pointerover",()=>{
            ready2.setScale(1.2);
        })

        ready2.on("pointerout",()=>{
            ready2.setScale(1);
        })
        
        borrar1.on("pointerdown",()=>{
            seguroBorrar1.setVisible(true);
            cancelar1.setVisible(true);
            aceptar1.setVisible(true);
        })
        
        cancelar1.on("pointerdown",()=>{
            seguroBorrar1.setVisible(false);
            cancelar1.setVisible(false);
            aceptar1.setVisible(false);
        })
        aceptar1.on("pointerdown",()=>{
			const inputTextId = elementId1.getChildByName('nameField');

                if (inputTextId.value !== '')
                {
					$.ajax({
						
					method: "DELETE",
					
					url:ipLocal+"usuario/"+inputTextId.value,
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
						console.log(textStatus+" "+jqXHR.statusCode());
						if(textStatus == "success"){
							seguroBorrar1.setVisible(false);
            				elementId1.setVisible(true);
            				elementPw1.setVisible(true);
            				cancelar1.setVisible(false);
            				aceptar1.setVisible(false);
						}else{
							alert("Contraseña del jugador 2 incorrecta. ");
							}
					}).fail(function(data, textStatus, jqXHR){
						alert("Usuario invalido o no registrado");
					});
                }
        })
        
        borrar2.on("pointerdown",()=>{
            seguroBorrar2.setVisible(true);
            cancelar2.setVisible(true);
            aceptar2.setVisible(true);
        })
        
        cancelar2.on("pointerdown",()=>{
            seguroBorrar2.setVisible(false);
            cancelar2.setVisible(false);
            aceptar2.setVisible(false);
        })
        aceptar2.on("pointerdown",()=>{
			const inputTextId = elementId2.getChildByName('nameField');

                if (inputTextId.value !== '')
                {
					$.ajax({
						
					method: "DELETE",
					
					url:ipLocal+"usuario/"+inputTextId.value,
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
						console.log(textStatus+" "+jqXHR.statusCode());
						if(textStatus == "success"){
							seguroBorrar2.setVisible(false);
            				elementId2.setVisible(true);
            				elementPw2.setVisible(true);
            				cancelar2.setVisible(false);
            				aceptar2.setVisible(false);
						}else{
							alert("Contraseña del jugador 2 incorrecta. ");
							}
					}).fail(function(data, textStatus, jqXHR){
						alert("Usuario invalido o no registrado");
					});
                }
        })

        volver.on("pointerdown",()=>{
            this.scene.start("RegScene");
        })

        volver.on("pointerover",()=>{
            volver.setScale(1.6)
        })

        volver.on("pointerout",()=>{
            volver.setScale(1.2)
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