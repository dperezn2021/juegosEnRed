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
        this.load.image('aceptar','assets/Menu/BotonAceptar.png');
        this.load.image('marcoUFO','assets/Menu/MarcoVerde.png');
        this.load.image('vacioHitt','assets/Menu/Fondo Hitt.jpg');
        this.load.image('vacioUFO','assets/Menu/Fondo Ufo.jpg');
        this.load.image('volver','assets/Menu/BotonVolver.png');
        this.load.image('botonContraUFO','assets/Menu/botonContraUFO.png');
        this.load.image('botonContraHitt','assets/Menu/botonContraHitt.png');
        this.load.image('menuContraHitt','assets/Menu/tripleHitt.jpg');
        this.load.image('menuContraUfo','assets/Menu/tripleUfo.jpg');
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
        this.add.image(900, 500, 'fondoSL').setScale(1);


        ready1 = this.add.image(450, 770, 'BOkHitt').setScale(1);
        ready2 = this.add.image(1360, 770, 'BOkUFO').setScale(1);
        botonContraHitt = this.add.image(450, 600, 'botonContraHitt').setScale(1);
        botonContraUfo = this.add.image(1360, 600, 'botonContraUFO').setScale(1);
        
        vacioHitt = this.add.image(450, 500, 'vacioHitt').setScale(1);
        vacioUfo = this.add.image(1350, 500, 'vacioUFO').setScale(1);
        cambioContraUfo = this.add.image(1350, 500, 'menuContraUfo').setScale(1);
        cambioContraHitt = this.add.image(450, 500, 'menuContraHitt').setScale(1);
        vacioHitt.setVisible(false);
        vacioUfo.setVisible(false);
        cambioContraUfo.setVisible(false);
        cambioContraHitt.setVisible(false);
        
        volver = this.add.image(120, 80, 'volver').setScale(1.2);
        ready3 = this.add.image(450, 770, 'aceptar').setScale(1.5);
        ready4 = this.add.image(1360, 770, 'aceptar').setScale(1.5);
        ready3.setVisible(false);
        ready4.setVisible(false);
        
        player2 = this.add.sprite(480, 580, 'Hitt').setScale(1.2);
        player2.setVisible(false);
        
        player1 = this.add.sprite(1340, 580, 'Ufo').setScale(1.2);
        player1.setVisible(false);

        const elementId1 = this.add.dom(450, 300).createFromCache('nameform');
        const elementId2 = this.add.dom(1360, 300).createFromCache('nameform');
        const elementId3 = this.add.dom(450, 230).createFromCache('nameform');
        const elementId4 = this.add.dom(1360, 230).createFromCache('nameform');
        const elementPw1 = this.add.dom(450, 550).createFromCache('passform');
        const elementPw2 = this.add.dom(1360, 550).createFromCache('passform');
        const elementPwNH1 = this.add.dom(450, 420).createFromCache('passform');
        const elementPwNH2 = this.add.dom(450, 630).createFromCache('passform');
        const elementPwNU1 = this.add.dom(1360, 420).createFromCache('passform');
        const elementPwNU2 = this.add.dom(1360, 630).createFromCache('passform');
        elementPwNH1.setVisible(false);
        elementPwNH2.setVisible(false);
        elementPwNU1.setVisible(false);
        elementPwNU2.setVisible(false);
        elementId3.setVisible(false);
        elementId4.setVisible(false);

        marcoHitt1 = this.add.image(450, 300, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO1 = this.add.image(1360, 550, 'marcoUFO').setScale(1.15,1.2);
        marcoHitt2 = this.add.image(450, 550, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO2 = this.add.image(1360, 300, 'marcoUFO').setScale(1.15,1.2);
        marcoHitt3 = this.add.image(450, 420, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO3 = this.add.image(1360, 630, 'marcoUFO').setScale(1.15,1.2);
        marcoHitt4 = this.add.image(450, 630, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO4 = this.add.image(1360, 420, 'marcoUFO').setScale(1.15,1.2);
        marcoHitt5 = this.add.image(450, 230, 'marcoHitt').setScale(1.15,1.2);
        marcoUFO5 = this.add.image(1360, 230, 'marcoUFO').setScale(1.15,1.2);
        marcoHitt3.setVisible(false);
        marcoHitt4.setVisible(false);
        marcoUFO3.setVisible(false);
        marcoUFO4.setVisible(false);
        marcoHitt5.setVisible(false);
        marcoUFO5.setVisible(false);


        ready1.setInteractive();
        ready2.setInteractive();
        ready3.setInteractive();
        ready4.setInteractive();
        volver.setInteractive();
        botonContraHitt.setInteractive();
        botonContraUfo.setInteractive();

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
            const inputTextPw = elementPw2.getChildByName('password');

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

        ready3.on("pointerover",()=>{
            ready3.setScale(2);
        })

        ready3.on("pointerout",()=>{
            ready3.setScale(1.5);
        })
        
        ready3.on("pointerdown",()=>{
			 const inputTextPw1 = elementPwNH1.getChildByName('password');
             const inputTextPw2 = elementPwNH2.getChildByName('password');
             const inputTextId = elementId3.getChildByName('nameField');
             if(inputTextPw1.value !== '' && inputTextPw2.value !== '' && inputTextPw1.value == inputTextPw2.value){
				 $.ajax({
						
					method: "PUT",
					
					url:ipLocal+"usuario/"+inputTextId.value,
					
					data: JSON.stringify({nombre: inputTextId.value, password: inputTextPw1.value}),
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(textStatus+" "+jqXHR.statusCode());
						console.log(data);
						if(textStatus == "success"){
                            	elementId1.setVisible(true);
           						elementPw1.setVisible(true);
            					ready1.setVisible(true);
            					marcoHitt1.setVisible(true);
           						marcoHitt2.setVisible(true);
            					elementPwNH1.setVisible(false);
        						elementPwNH2.setVisible(false);
        						elementId3.setVisible(false);
        						cambioContraHitt.setVisible(false);
        						marcoHitt3.setVisible(false);
        						marcoHitt4.setVisible(false);
        						marcoHitt5.setVisible(false);
        						ready3.setVisible(false);
						}
					}).fail(function(data){
						alert("Usuario invalido o ya registrado.");
					});
			 }
		})
		
		ready4.on("pointerover",()=>{
            ready4.setScale(2);
        })

        ready4.on("pointerout",()=>{
            ready4.setScale(1.5);
        })
        
        ready4.on("pointerdown",()=>{
			 const inputTextPw1 = elementPwNU1.getChildByName('password');
             const inputTextPw2 = elementPwNU2.getChildByName('password');
             const inputTextId = elementId4.getChildByName('nameField');
             if(inputTextPw1.value !== '' && inputTextPw2.value !== '' && inputTextPw1.value == inputTextPw2.value){
				 $.ajax({
						
					method: "PUT",
					
					url:ipLocal+"usuario/"+inputTextId.value,
					
					data: JSON.stringify({nombre: inputTextId.value, password: inputTextPw1.value}),
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(textStatus+" "+jqXHR.statusCode());
						console.log(data);
						if(textStatus == "success"){
                            	elementId2.setVisible(true);
           						elementPw2.setVisible(true);
            					ready2.setVisible(true);
            					marcoUFO1.setVisible(true);
           						marcoUFO2.setVisible(true);
            					elementPwNU1.setVisible(false);
        						elementPwNU2.setVisible(false);
        						elementId4.setVisible(false);
        						cambioContraUfo.setVisible(false);
        						marcoUFO3.setVisible(false);
        						marcoUFO4.setVisible(false);
        						marcoUFO5.setVisible(false);
        						ready4.setVisible(false);
						}
					}).fail(function(data){
						alert("Usuario invalido o ya registrado.");
					});
			 }
		})
        
        botonContraHitt.on("pointerdown",()=>{
			elementId1.setVisible(false);
            elementPw1.setVisible(false);
            ready1.setVisible(false);
            marcoHitt1.setVisible(false);
            marcoHitt2.setVisible(false);
            elementPwNH1.setVisible(true);
        	elementPwNH2.setVisible(true);
        	elementId3.setVisible(true);
        	cambioContraHitt.setVisible(true);
        	marcoHitt3.setVisible(true);
        	marcoHitt4.setVisible(true);
        	marcoHitt5.setVisible(true);
        	ready3.setVisible(true);
			 
        })
        
        botonContraUfo.on("pointerdown",()=>{
			elementId2.setVisible(false);
            elementPw2.setVisible(false);
            ready2.setVisible(false);
            marcoUFO1.setVisible(false);
            marcoUFO2.setVisible(false);
            elementPwNU1.setVisible(true);
        	elementPwNU2.setVisible(true);
        	elementId4.setVisible(true);
        	cambioContraUfo.setVisible(true);
        	marcoUFO3.setVisible(true);
        	marcoUFO4.setVisible(true);
        	marcoUFO5.setVisible(true);
        	ready4.setVisible(true);
			 
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