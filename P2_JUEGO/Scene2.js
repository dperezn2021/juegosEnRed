var Scene2 = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "Scene2" });
    },

    init: function(data) {
        this.message = data.message;
    },

    preload: function() {},

    create: function() {
        var text = this.add.text(1062, 590, this.message, {fontSize: 50,color: "#000000",fontStyle: "bold"}).setOrigin(0.5);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    },

    update: function() {
        if(this.keyS.isDown){
            this.scene.start("Scene1");
        }
    }
});