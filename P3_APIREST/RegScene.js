var RegScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "RegScene" });
    },

    init: function() {
    },

    preload: function() {
        this.load.image('fondo1','assets/Menu/Registrarse.jpg');
        this.load.image('fondo2','assets/Menu/Iniciar sesion.jpg');
    },

    create: function() {
        this.add.image(900, 500, 'fondo').setScale(0.85);
        
        imgTutoBN = this.add.image(540, 550, 'fondo1').setScale(0.8);
        imgPartBN = this.add.image(1260, 550, 'fondo2').setScale(0.8);
        volver = this.add.image(120, 80, 'volver').setScale(1.2);
        imgTutoBN.setInteractive();
        imgPartBN.setInteractive();
        volver.setInteractive();

        imgPartBN.on("pointerdown",()=>{
            this.scene.start("signInScene");
        })

        imgPartBN.on("pointerover",()=>{
            imgPartBN.setScale(0.8,0.9);
        })

        imgPartBN.on("pointerout",()=>{
            imgPartBN.setScale(0.8,0.8);
        })

        imgTutoBN.on("pointerdown",()=>{
            this.scene.start("logInScene");
        })

        imgTutoBN.on("pointerover",()=>{
            imgTutoBN.setScale(0.8,0.9);
        })

        imgTutoBN.on("pointerout",()=>{
            imgTutoBN.setScale(0.8,0.8);
        })

        volver.on("pointerdown",()=>{
            this.scene.start("ElecScene");
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