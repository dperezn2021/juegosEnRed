var MenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "MenuScene" });
    },

    init: function() {},

    preload: function() {
        this.load.image('fondo','assets/fondo_pocho.png');
        this.load.image('play','assets/play.png');
        this.load.image('ajustes','assets/ajustes.png');
    },

    create: function() {
        this.add.image(1062, 590, 'fondo');

        let play = this.add.image(1062, 560, 'play').setScale(0.3);

        let ajustes = this.add.image(2050, 1100, 'ajustes');

        play.setInteractive();

        play.on("pointerdown",()=>{
            this.scene.start("Scene1");
        })

        play.on("pointerover",()=>{
            play.setScale(0.5);
        })

        play.on("pointerout",()=>{
            play.setScale(0.3);
        })
    },
    update: function() {
        
    }
});