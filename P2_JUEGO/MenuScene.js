var MenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function() {
        Phaser.Scene.call(this, { "key": "MenuScene" });
    },

    init: function() {},

    preload: function() {
        this.load.image('fondo','assets/Background/Fondo_Menu.jpg');
        this.load.image('play','assets/Menu/play.png');
        this.load.image('ajustes','assets/Menu/ajustes.png');
        this.load.image('exit','assets/Menu/salir.png');
        this.load.image('logo','assets/Menu/logo.png');
    },

    create: function() {
        this.add.image(1000, 500, 'fondo').setScale(0.99, 0.85);

        let play = this.add.image(1000, 590, 'play').setScale(2);

        //let ajustes = this.add.image(1000, 720, 'ajustes').setScale(1.2);

        let salir = this.add.image(1000, 720, 'exit').setScale(1.5);

        // Añade interactividad a los botones
        play.setInteractive();
        //ajustes.setInteractive();
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
            play.setScale(2.5);
        })

        play.on("pointerout",()=>{
            play.setScale(2);
        })

        /*ajustes.on("pointerover",()=>{
            ajustes.setScale(1.8);
        })

        ajustes.on("pointerout",()=>{
            ajustes.setScale(1.2);
        })*/

        salir.on("pointerover",()=>{
            salir.setScale(2);
        })

        salir.on("pointerout",()=>{
            salir.setScale(1.5);
        })

        salir.on("pointerdown",()=>{
           exitButtonClick();
        })
    },
    update: function() {
        
    }
});