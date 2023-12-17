var rankingScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "rankingScene" });
    },

    init: function(data) {
        IdP1 = data.IdP1;
        IdP2 = data.IdP2;
    },

    preload: function() {
        this.load.image('ranking','assets/Background/RankingInterfaz.png');
    },

    create: function() {
		ipLocal = "http://127.0.0.1:8080/";
        this.add.image(900, 500, 'ranking'); 
        
        usu1 = this.add.text(770, 450, '1 --', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        usu2 = this.add.text(770, 530, '2 --', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        usu3 = this.add.text(770, 610, '3 --', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        usu4 = this.add.text(770, 690, '4 --', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        usu5 = this.add.text(770, 770, '5 --', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        
        puntos1 = this.add.text(930, 450, '---', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        puntos2 = this.add.text(930, 530, '---', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        puntos3 = this.add.text(930, 610, '---', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        puntos4 = this.add.text(930, 690, '---', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        puntos5 = this.add.text(930, 770, '---', {fontSize: 55,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
		$.ajax({
						
					method: "GET",
					
					url:ipLocal+"puntos",
					
					processData: false,
					
					headers: {
						"Content-type":"application/json"
					}
					
					}).done(function(data, textStatus, jqXHR) {
						console.log(data);
						if(data.length == 1){
							usu1.setText("1 "+data[0].nombre);
							puntos1.setText(data[0].puntos);
						}else if(data.length == 2){
							usu1.setText("1 "+data[0].nombre);
							puntos1.setText(data[0].puntos);
							usu2.setText("2 "+data[1].nombre);
							puntos2.setText(data[1].puntos);
						}else if(data.length == 3){
							usu1.setText("1 "+data[0].nombre);
							puntos1.setText(data[0].puntos);
							usu2.setText("2 "+data[1].nombre);
							puntos2.setText(data[1].puntos);
							usu3.setText("3 "+data[2].nombre);
							puntos3.setText(data[2].puntos);
						}else if(data.length == 4){
							usu1.setText("1 "+data[0].nombre);
							puntos1.setText(data[0].puntos);
							usu2.setText("2 "+data[1].nombre);
							puntos2.setText(data[1].puntos);
							usu3.setText("3 "+data[2].nombre);
							puntos3.setText(data[2].puntos);
							usu4.setText("4 "+data[3].nombre);
							puntos4.setText(data[3].puntos);
						}else if (data.length >= 5){
							usu1.setText("1 "+data[0].nombre);
							puntos1.setText(data[0].puntos);
							usu2.setText("2 "+data[1].nombre);
							puntos2.setText(data[1].puntos);
							usu3.setText("3 "+data[2].nombre);
							puntos3.setText(data[2].puntos);
							usu4.setText("4 "+data[3].nombre);
							puntos4.setText(data[3].puntos);
							usu5.setText("5 "+data[4].nombre);
							puntos5.setText(data[4].puntos);
						}
					}).fail(function(data, textStatus, jqXHR){
						console.log(data);
					});
					
        this.add.text(500, 940, '<Pulsa P para jugar otra vez>', {fontSize: 50,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        this.add.text(1200, 940, '<Pulsa M para volver al menu>', {fontSize: 50,color: "#FFFFFF",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);

        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    },

    update: function() {
        if(this.keyP.isDown){
            this.scene.start("Scene1", {"IdP1":IdP1, "IdP2": IdP2});
        }
        if(this.keyM.isDown){
            this.scene.start("MenuScene");
        }
    }
});