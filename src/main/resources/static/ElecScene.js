var ElecScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "ElecScene" });
    },

    init: function() {
    },

    preload: function() {
        this.load.image('fondoTutoColor','assets/Menu/menuTutorialColor.png');
        this.load.image('fondoPartColor','assets/Menu/menuVersusColor.png');
        this.load.image('volver','assets/Menu/BotonVolver.png');
        this.load.image('fondoTutoBN','assets/Menu/menuTutorialBN.png');
        this.load.image('fondoPartBN','assets/Menu/menuVersusBN.png');
    },

    create: function() {
        this.add.image(900, 500, 'fondo').setScale(0.85);
        
        imgTutoBN = this.add.image(450, 500, 'fondoTutoBN').setScale(1);
        imgPartBN = this.add.image(1350, 500, 'fondoPartBN').setScale(1);
        imgPartColor = this.add.image(1350, 500, 'fondoPartColor').setScale(1);
        imgTutoColor = this.add.image(450, 500, 'fondoTutoColor').setScale(1);
        imgTutoBN.setInteractive();
        imgPartBN.setInteractive();
        imgPartColor.setVisible(false);
        imgTutoColor.setVisible(false);
        volver = this.add.image(120, 80, 'volver').setScale(1.2);
        volver.setInteractive();

        imgPartBN.on("pointerdown",()=>{
            this.scene.start("RegScene");
        })

        imgPartBN.on("pointerover",()=>{
            imgPartColor.setVisible(true);
        })

        imgPartBN.on("pointerout",()=>{
            imgPartColor.setVisible(false);
        })

        imgTutoBN.on("pointerdown",()=>{
            this.scene.start("tutorialScene");
        })

        imgTutoBN.on("pointerover",()=>{
            imgTutoColor.setVisible(true);
        })

        imgTutoBN.on("pointerout",()=>{
            imgTutoColor.setVisible(false);
        })

        volver.on("pointerdown",()=>{
            volver.destroy();
            backgroundMusic.stop();
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