var ElecScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "ElecScene" });
    },

    init: function() {
    },

    preload: function() {
        this.load.image('fondoTutoColor','assets/Partida/prue_tuto1.png');
        this.load.image('fondoPartColor','assets/Partida/prue_tuto2.png');
        this.load.image('volver','assets/Menu/BotonVolver.png');
        this.load.image('fondoTutoBN','assets/Partida/prue_tuto1_BN.png');
        this.load.image('fondoPartBN','assets/Partida/prue_tuto2_BN.png');
    },

    create: function() {
        this.add.image(900, 500, 'fondo').setScale(0.85);
        
        imgTutoBN = this.add.image(500, 550, 'fondoTutoBN').setScale(0.8);
        imgPartBN = this.add.image(1300, 550, 'fondoPartBN').setScale(0.8);
        volver = this.add.image(120, 80, 'volver').setScale(1.2);
        imgTutoBN.setInteractive();
        imgPartBN.setInteractive();
        volver.setInteractive();

        imgPartBN.on("pointerdown",()=>{
            this.scene.start("RegScene");
        })

        imgPartBN.on("pointerover",()=>{
            imgPartColor = this.add.image(1300, 550, 'fondoPartColor').setScale(0.8);
        })

        imgPartBN.on("pointerout",()=>{
            imgPartColor.destroy();
        })

        imgTutoBN.on("pointerdown",()=>{
            this.scene.start("tutorialScene");
        })

        imgTutoBN.on("pointerover",()=>{
            imgTutoColor = this.add.image(500, 550, 'fondoTutoColor').setScale(0.8);
        })

        imgTutoBN.on("pointerout",()=>{
            imgTutoColor.destroy();
        })

        volver.on("pointerdown",()=>{
            volver.destroy();
            this.scene.start("MenuScene");
        })

        volver.on("pointerover",()=>{
            volver.setScale(1.6)
        })

        volver.on("pointerout",()=>{
            volver.setScale(1.2)
        })
    },

    update: function() {

    }
});