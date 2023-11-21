var Scene1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "Scene1" });
    },

    init: function() {},

    preload: function() {
        this.load.image('dude', 'assets/dude.png');
    },

    create: function() {
        this.dude = this.add.image(1062, 590, "dude");

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    },
    update: function() {
        if(this.keyA.isDown){
            this.scene.start("Scene2", { "message": "Game Over" });
        }
    }
});