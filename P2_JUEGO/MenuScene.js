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
        this.load.image('exit','assets/salir.png');
    },

    create: function() {
        this.add.image(1062, 590, 'fondo');

        let play = this.add.image(1062, 590, 'play').setScale(1.5);

        let ajustes = this.add.image(1062, 720, 'ajustes').setScale(1.2);

        let salir = this.add.image(1062, 850, 'exit').setScale(1.2);

        // Añade interactividad a los botones
        play.setInteractive();
        ajustes.setInteractive();
        salir.setInteractive();

        function exitButtonClick() 
        {    if (confirm("¿Seguro que quieres salir?")) {
            //navigator.app.exitApp();  
             }
            ;}
        play.on("pointerdown",()=>{
            this.scene.start("Scene1");
        })

        play.on("pointerover",()=>{
            play.setScale(2);
        })

        play.on("pointerout",()=>{
            play.setScale(1.5);
        })

        ajustes.on("pointerover",()=>{
            ajustes.setScale(1.8);
        })

        ajustes.on("pointerout",()=>{
            ajustes.setScale(1.2);
        })

        salir.on("pointerover",()=>{
            salir.setScale(1.8);
        })

        salir.on("pointerout",()=>{
            salir.setScale(1.2);
        })

        salir.on("pointerdown",()=>{
           exitButtonClick();
        })
    },
    update: function() {
        
    }
});