var Scene2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "Scene2" });
    },

    init: function(data) {
        this.points1 = data.points1;
        this.points2 = data.points2;
    },

    preload: function() {
        this.load.image('ganaHitt','assets/Background/ganaHitt.png');
        this.load.image('ganaUfo','assets/Background/ganaUfo.png');
    },

    create: function() {
        if(this.points1>this.points2){
            this.add.image(1000, 500, 'ganaHitt'); 
            this.add.text(650, 750, this.points1, {fontSize: 100,color: "#ffffff", fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
            this.add.text(1730, 730, this.points2, {fontSize: 75,color: "#ffffff",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        }else if(this.points2>this.points1){
            this.add.image(1000, 500, 'ganaUfo'); 
            this.add.text(1350, 750, this.points2, {fontSize: 100,color: "#ffffff",fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
            this.add.text(300, 730, this.points1, {fontSize: 75,color: "#ffffff", fontFamily: 'Impact, fantasy'}).setOrigin(0.5);
        }
        //this.add.text(1062, 790, '<Pulsa P para jugar otra vez>', {fontSize: 50,color: "#FFFFFF",fontStyle: "bold"}).setOrigin(0.5);
        //this.add.text(1062, 890, '<Pulsa M para volver al menu>', {fontSize: 50,color: "#FFFFFF",fontStyle: "bold"}).setOrigin(0.5);

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