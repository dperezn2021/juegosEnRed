var Scene2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "Scene2" });
    },

    init: function(data) {
        this.points1 = data.points1;
        this.points2 = data.points2;
    },

    preload: function() {},

    create: function() {
        if(this.points1>this.points2){
            this.add.text(1062, 490, 'Gana el jugador 1 con '+this.points1+' puntos', {fontSize: 50,color: "#FFFFFF",fontStyle: "bold"}).setOrigin(0.5);
        }else if(this.points2>this.points1){
            this.add.text(1062, 490, 'Gana el jugador 2 con '+this.points2+' puntos', {fontSize: 50,color: "#FFFFFF",fontStyle: "bold"}).setOrigin(0.5);
        }
        this.add.text(1062, 790, '<Pulsa P para jugar otra vez>', {fontSize: 50,color: "#FFFFFF",fontStyle: "bold"}).setOrigin(0.5);
        this.add.text(1062, 890, '<Pulsa M para volver al menu>', {fontSize: 50,color: "#FFFFFF",fontStyle: "bold"}).setOrigin(0.5);

        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    },

    update: function() {
        if(this.keyP.isDown){
            this.scene.start("Scene1");
        }
        if(this.keyM.isDown){
            this.scene.start("MenuScene");
        }
    }
});