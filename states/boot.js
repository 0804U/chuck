/**
 * INITIATE THE CHUCK GAME OBJECT
 */
var Chuck = {
    woodCountTxt: null,
    modal: false,
    bag: false,
    menu: false,
    powerupExists: false
};

/**
 * BOOT THE CHUCK GAME OBJECT
 */
Chuck.Boot = function (game) {
    /**
     * IS LOCALSTORAGE SUPPORTED
     */
    if(typeof(Storage) !== "undefined") {
        /**
         * DO WE HAVE A SAVE FILE
         */
        if (localStorage.getItem('chuckGameData')) {
            /**
             * YES WE DO, LOAD IT
             */
            console.log("Retrieving Game Data.");
            Chuck.gameData = JSON.parse(localStorage.getItem('chuckGameData'));
        } else {
            /**
             * NO WE DON'T, SET THE DEFAULTS
             */
            Chuck.gameData = {
                tutorial: false,
                woodCount: 0,
                woodTotal: 0,
                clicksTotal: 0,
                fruitTotal: 0,
                acornTotal: 0,
                nestTotal: 0,
                achievementsTotal: 0,
                achievementWoodLevel: 0,
                achievementFruitLevel: 0,
                achievementClicksLevel: 0,
                achievementAcornLevel: 0,
                achievementNestLevel: 0,
                axe : 1,
                power : 1,
                speed : 1,
                luck : 1,
                inventorySpace : 12,
                inventoryArray : ['powerup-small-apple','powerup-small-apple','powerup-small-apple','powerup-small-apple'],
                achievementArray: {
                    "wood-level-1" : {
                        'status'    : 0,
                        'msg'       : "Collect 100 Wood",
                        'icon'      : "wood",
                        'level'     : 1
                    },"wood-level-2" : {
                        'status'    : 0,
                        'msg'       : "Collect 500 Wood",
                        'icon'      : "wood",
                        'level'     : 2
                    },"wood-level-3" : {
                        'status'    : 0,
                        'msg'       : "Collect 1,250 Wood",
                        'icon'      : "wood",
                        'level'     : 3
                    },"wood-level-4" : {
                        'status'    : 0,
                        'msg'       : "Collect 5,000 Wood",
                        'icon'      : "wood",
                        'level'     : 4
                    },"wood-level-5" : {
                        'status'    : 0,
                        'msg'       : "Collect 15,000 Wood",
                        'icon'      : "wood",
                        'level'     : 5
                    },"wood-level-6" : {
                        'status'    : 0,
                        'msg'       : "Collect 50,000 Wood",
                        'icon'      : "wood",
                        'level'     : 6
                    },"wood-level-7" : {
                        'status'    : 0,
                        'msg'       : "Collect 100,000 Wood",
                        'icon'      : "wood",
                        'level'     : 7
                    },"wood-level-8" : {
                        'status'    : 0,
                        'msg'       : "Collect 250,000 Wood",
                        'icon'      : "wood",
                        'level'     : 8
                    },"wood-level-9" : {
                        'status'    : 0,
                        'msg'       : "Collect 500,000 Wood",
                        'icon'      : "wood",
                        'level'     : 9
                    },"wood-level-10" : {
                        'status'    : 0,
                        'msg'       : "Collect 1,000,000 Wood",
                        'icon'      : "wood",
                        'level'     : 10
                    },
                    "clicks-level-1" : {
                        'status'    : 0,
                        'msg'       : "Click 50 Times",
                        'icon'      : "clicks",
                        'level'     : 1
                    },"clicks-level-2" : {
                        'status'    : 0,
                        'msg'       : "Click 100 Times",
                        'icon'      : "clicks",
                        'level'     : 2
                    },"clicks-level-3" : {
                        'status'    : 0,
                        'msg'       : "Click 250 Times",
                        'icon'      : "clicks",
                        'level'     : 3
                    },"clicks-level-4" : {
                        'status'    : 0,
                        'msg'       : "Click 500 Times",
                        'icon'      : "clicks",
                        'level'     : 4
                    },"clicks-level-5" : {
                        'status'    : 0,
                        'msg'       : "Click 1000 Times",
                        'icon'      : "clicks",
                        'level'     : 5
                    },"clicks-level-6" : {
                        'status'    : 0,
                        'msg'       : "Click 2500 Times",
                        'icon'      : "clicks",
                        'level'     : 6
                    },"clicks-level-7" : {
                        'status'    : 0,
                        'msg'       : "Click 5000 Times",
                        'icon'      : "clicks",
                        'level'     : 7
                    },"clicks-level-8" : {
                        'status'    : 0,
                        'msg'       : "Click 10000 Times",
                        'icon'      : "clicks",
                        'level'     : 8
                    },"clicks-level-9" : {
                        'status'    : 0,
                        'msg'       : "Click 20000 Times",
                        'icon'      : "clicks",
                        'level'     : 9
                    },"clicks-level-10" : {
                        'status'    : 0,
                        'msg'       : "Click 50000 Times",
                        'icon'      : "clicks",
                        'level'     : 10
                    },
                    "fruit-level-1" : {
                        'status'    : 0,
                        'msg'       : "Collect 1 Fruit",
                        'icon'      : "fruit",
                        'level'     : 1
                    },"fruit-level-2" : {
                        'status'    : 0,
                        'msg'       : "Collect 3 Fruit",
                        'icon'      : "fruit",
                        'level'     : 2
                    },"fruit-level-3" : {
                        'status'    : 0,
                        'msg'       : "Collect 7 Fruit",
                        'icon'      : "fruit",
                        'level'     : 3
                    },"fruit-level-4" : {
                        'status'    : 0,
                        'msg'       : "Collect 15 Fruit",
                        'icon'      : "fruit",
                        'level'     : 4
                    },"fruit-level-5" : {
                        'status'    : 0,
                        'msg'       : "Collect 25 Fruit",
                        'icon'      : "fruit",
                        'level'     : 5
                    },"fruit-level-6" : {
                        'status'    : 0,
                        'msg'       : "Collect 50 Fruit",
                        'icon'      : "fruit",
                        'level'     : 6
                    },"fruit-level-7" : {
                        'status'    : 0,
                        'msg'       : "Collect 100 Fruit",
                        'icon'      : "fruit",
                        'level'     : 7
                    },"fruit-level-8" : {
                        'status'    : 0,
                        'msg'       : "Collect 250 Fruit",
                        'icon'      : "fruit",
                        'level'     : 8
                    },"fruit-level-9" : {
                        'status'    : 0,
                        'msg'       : "Collect 500 Fruit",
                        'icon'      : "fruit",
                        'level'     : 9
                    },"fruit-level-10" : {
                        'status'    : 0,
                        'msg'       : "Collect 1,000 Fruit",
                        'icon'      : "fruit",
                        'level'     : 10
                    },
                    "acorn-level-1" : {
                        'status'    : 0,
                        'msg'       : "Collect 1 Acorn",
                        'icon'      : "acorn",
                        'level'     : 1
                    },"acorn-level-2" : {
                        'status'    : 0,
                        'msg'       : "Collect 2 Acorns",
                        'icon'      : "acorn",
                        'level'     : 2
                    },"acorn-level-3" : {
                        'status'    : 0,
                        'msg'       : "Collect 3 Acorns",
                        'icon'      : "acorn",
                        'level'     : 3
                    },"acorn-level-4" : {
                        'status'    : 0,
                        'msg'       : "Collect 4 Acorns",
                        'icon'      : "acorn",
                        'level'     : 4
                    },"acorn-level-5" : {
                        'status'    : 0,
                        'msg'       : "Collect 5 Acorns",
                        'icon'      : "acorn",
                        'level'     : 5
                    },"acorn-level-6" : {
                        'status'    : 0,
                        'msg'       : "Collect 6 Acorns",
                        'icon'      : "acorn",
                        'level'     : 6
                    },"acorn-level-7" : {
                        'status'    : 0,
                        'msg'       : "Collect 7 Acorns",
                        'icon'      : "acorn",
                        'level'     : 7
                    },"acorn-level-8" : {
                        'status'    : 0,
                        'msg'       : "Collect 8 Acorns",
                        'icon'      : "acorn",
                        'level'     : 8
                    },"acorn-level-9" : {
                        'status'    : 0,
                        'msg'       : "Collect 9 Acorns",
                        'icon'      : "acorn",
                        'level'     : 9
                    },"acorn-level-10" : {
                        'status'    : 0,
                        'msg'       : "Collect 10 Acorns",
                        'icon'      : "acorn",
                        'level'     : 10
                    },
                    "nest-level-1" : {
                        'status'    : 0,
                        'msg'       : "Collect 1 Nest",
                        'icon'      : "nest",
                        'level'     : 1
                    },"nest-level-2" : {
                        'status'    : 0,
                        'msg'       : "Collect 2 Nests",
                        'icon'      : "nest",
                        'level'     : 2
                    },"nest-level-3" : {
                        'status'    : 0,
                        'msg'       : "Collect 3 Nests",
                        'icon'      : "nest",
                        'level'     : 3
                    },"nest-level-4" : {
                        'status'    : 0,
                        'msg'       : "Collect 4 Nests",
                        'icon'      : "nest",
                        'level'     : 4
                    },"nest-level-5" : {
                        'status'    : 0,
                        'msg'       : "Collect 5 Nests",
                        'icon'      : "nest",
                        'level'     : 5
                    },"nest-level-6" : {
                        'status'    : 0,
                        'msg'       : "Collect 6 Nests",
                        'icon'      : "nest",
                        'level'     : 6
                    },"nest-level-7" : {
                        'status'    : 0,
                        'msg'       : "Collect 7 Nests",
                        'icon'      : "nest",
                        'level'     : 7
                    },"nest-level-8" : {
                        'status'    : 0,
                        'msg'       : "Collect 8 Nests",
                        'icon'      : "nest",
                        'level'     : 8
                    },"nest-level-9" : {
                        'status'    : 0,
                        'msg'       : "Collect 9 Nests",
                        'icon'      : "nest",
                        'level'     : 9
                    },"nest-level-10" : {
                        'status'    : 0,
                        'msg'       : "Collect 10 Nests",
                        'icon'      : "nest",
                        'level'     : 10
                    }
                }
            };
        }
    }
};

Chuck.Boot.prototype = {
    preload: function () {
        /**
         * LOAD ASSETS REQUIRED FOR PRELOADER
         */
        this.load.bitmapFont('cfont', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
        
        this.load.image('menu-background', 'assets/titlepage-bg.png');
        this.load.image('menu-logo', 'assets/title-logo.png');
        this.load.image('button-play', 'assets/button-play.png');
        this.load.image('fyretale-logo', 'assets/fyretale-logo-full.png');
        this.load.image('fyretale-loading', 'assets/fyretale-logo-full-loading.png');
    },

    create: function () {
        /**
         * SET APP DEFAULTS
         *
         * - SET MULTI-TOUCH TO FALSE
         * - DISABLE PAUSING THE GAME WHEN IT LOSES FOCUS
         */
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.game.canvas.style.cursor = 'inherit';

        this.scale.minWidth = 320;
        this.scale.minHeight = 480;
        this.scale.maxWidth = 320;
        this.scale.maxHeight = 480;
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.scale.forcePortrait = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.scale.setScreenSize(true);
        this.world.scale.setTo(0.5, 0.5);
        
        /**
         * START THE GAME PRELOADER
         */
        this.state.start('Preloader');
    }
};