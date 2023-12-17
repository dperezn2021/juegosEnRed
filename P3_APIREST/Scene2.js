var Scene2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "Scene2" });
    },

    init: function(data) {
        points1 = data.points1;
        points2 = data.points2;
        IdP1 = data.IdP1;
        IdP2 = data.IdP2;
    },

    preload: function() {
        this.load.image('ganaHitt','assets/Background/ganaHitt.png');
        this.load.image('ganaUfo','assets/Background/ganaUfo.png');
    },

    create: function() {
		ipLocal = "http://127.0.0.1:8080/";
		$.ajax({
						
					method: "POST",
					
					url:ipLocal+"puntos",
					
					data: JSON.stringify({nombre: IdP1,puntos:points1}),
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
                        console.log("Puntos guardados 1");
					}).fail(function(data, textStatus, jqXHR){
						console.log(data);
						console.log("No se han podido guardar");
					});
					
					$.ajax({
						
					method: "POST",
					
					url:ipLocal+"puntos",
					
					data: JSON.stringify({nombre: IdP2,puntos:points2}),
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
                        console.log("Puntos guardados 2");
					}).fail(function(data, textStatus, jqXHR){
						console.log(data);
						console.log("No se han podido guardar");
					});
					
        if(points1>points2){
            this.add.image(900, 500, 'ganaHitt').setScale(0.9,1); 
            this.add.text(580, 750, points1, {fontSize: 100,color: "#ffffff", fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
            this.add.text(1550, 730, points2, {fontSize: 75,color: "#ffffff",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        }else if(points2>points1){
            this.add.image(900, 500, 'ganaUfo').setScale(0.9,1); 
            this.add.text(1220, 750, points2, {fontSize: 100,color: "#ffffff",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
            this.add.text(280, 730, points1, {fontSize: 75,color: "#ffffff", fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        }
        this.add.text(300, 940, '<Pulsa P para jugar otra vez>', {fontSize: 45,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        this.add.text(910, 940, '<Pulsa M para volver al menu>', {fontSize: 45,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        this.add.text(1500, 940, '<Pulsa R para ver el ranking>', {fontSize: 45,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);

        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    },

    update: function() {
        if(this.keyP.isDown){
            this.scene.start("Scene1", {"IdP1":IdP1, "IdP2": IdP2});
        }
        if(this.keyM.isDown){
            this.scene.start("MenuScene");
        }
        if(this.keyR.isDown){
            this.scene.start("rankingScene", {"IdP1":IdP1, "IdP2": IdP2});
        }
    }
});