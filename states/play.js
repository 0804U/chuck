Chuck.Play = function (game) {
    
};

Chuck.Play.prototype = {
    gameGUI : null,
    music : null,
    tutorialPart: 1,
	create: function () {
        /**
         * START UP THE PHYSICS
         */
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        if (!this.music) {
            this.music = this.game.add.audio('themeMusic',0.3,true);
            this.music.play();
        }
        /**
         * CREATE GAME GROUPS
         */
        this.gameGUI = this.game.add.group();
        this.gamePowerups = this.game.add.group();
        this.gameEntities = this.game.add.group();
        this.gameShop = this.game.add.group();
        this.gameBag = this.game.add.group();
        this.gameDebug = this.game.add.group();
        this.gameMenu = this.game.add.group();
        this.tutorial = this.game.add.group();
        
        this.gameBag.x = 0;
        this.gameBag.y = (this.game.scale.bounds.height*2) - 104;

        /**
         * CREATE GAME OBJECTS
         */
        Chuck.PlayerActor = new Chuck.Player(32, 472, this.game, this.gameEntities);
        Chuck.TreeActor = new Chuck.Tree(this.game, this.gameEntities);
        Chuck.InventoryActor = new Chuck.Inventory(this.game, this.gameBag);
        Chuck.PowerupActor = new Chuck.Powerup((this.game.scale.bounds.width*2) - 100, 0, this.game, this.gamePowerups);
        Chuck.ShopActor = new Chuck.Shop(this.game, this.gameShop);
        Chuck.AchievementsActor = new Chuck.Achievements(this.game, this.gameGUI);
        
        /**
         * INSERT LEVEL ASSETS
         */
        
        // FOREST BACKGROUND
        this.background = this.add.sprite(0, 0, 'ingame-background');
        
        // INVISIBLE FLOOR FOR ITEMS TO LAND ON
        this.floor = this.add.sprite(0,
                                     (this.game.scale.bounds.height*2) - 185,
                                     'overlay');
        this.floor.alpha = 0;
        this.floor.width = this.game.scale.bounds.width*2;
        
        
        /**
         * INSERT DEBUGGING INFO
         */
        this.debugBG = this.add.sprite(
            0,
            0,
        'overlay');
        this.debugBG.width = this.game.scale.bounds.width;
        this.debugBG.height = 200;
        
        this.debugPowerText = this.add.bitmapText(10, 10, 'cfont', '' + this.world.countLiving());
        this.debugPowerText.fill = '#FFFFFF';
        this.debugPowerText.fontSize = 32;
        
        this.gameDebug.addMultiple([this.debugBG, this.debugPowerText]);
        
        // TREE STUMP THAT DOESN'T MOVE
        this.ingameStump = this.add.sprite(
            (this.game.scale.bounds.width) - 120,
            (this.game.scale.bounds.height*2) - 264,
            'ingame-tree-stump'
        );
        
        /**
         * INSERT THE PLAYER
         */
        Chuck.PlayerActor.create();
        
        /**
         * INSERT THE TREE
         */
        Chuck.TreeActor.create();
        
        /**
         * INSERT THE ACHIEVEMENTS
         */
        Chuck.AchievementsActor.create(this.game);
        
        /**
         * INSERT THE CHOP ZONE TRIGGER
         */
        this.chopZone = this.add.sprite(Chuck.TreeActor.treeX, 0);
        this.chopZone.inputEnabled = true;
        this.chopZone.input.useHandCursor = true;
        this.chopZone.height = Chuck.TreeActor.treeParts.height - 60;
        this.chopZone.width = Chuck.TreeActor.treeParts.width;
        
        this.tutorialPart1 = this.add.sprite(
            0,
            0,
            'tutorial-part-1'
        );
        
        if (Chuck.gameData.tutorial) {
            this.tutorialPart1.alpha = 0;
            this.chopZone.events.onInputDown.add(this.chop, this);
        } else {
            this.tutorialPart1.alpha = 1;
        }
        
        this.tutorialPart2 = this.add.sprite(
            0,
            0,
            'tutorial-part-2'
        );
        this.tutorialPart2.alpha = 0;
        
        this.tutorialPart3 = this.add.sprite(
            0,
            0,
            'tutorial-part-3'
        );
        this.tutorialPart3.alpha = 0;
        
        this.tutorialPart4 = this.add.sprite(
            0,
            0,
            'tutorial-part-4'
        );
        this.tutorialPart4.alpha = 0;
        
        this.tutorial.addMultiple(
            [
                this.tutorialPart1,
                this.tutorialPart2,
                this.tutorialPart3,
                this.tutorialPart4
            ]
        );

        /**
         * INSERT GUI
         */
        
        // INSERT THE INVENTORY BACKGROUND
        Chuck.InventoryActor.create();
        
        // INSERT THE NAVIGATION BACKGROUND
        this.ingameNav = this.add.sprite(
            0,
            (this.game.scale.bounds.height*2) - 104,
            'ingame-nav'
        );
        
        // INSERT THE SHOP NAVIGATION ITEM
        this.ingameNavShop = this.add.button(
            (this.game.scale.bounds.width*2) - 264,
            (this.game.scale.bounds.height*2) - 80,
            'ingame-nav-upgrades',
            this.toggleShop,
            this
        );
        
        // ENABLE INPUT ON SHOP
        this.ingameNavShop.inputEnabled = true;
        this.ingameNavShop.input.useHandCursor = true;
        
        // INSERT THE BAG NAVIGATION ITEM
        this.ingameBagMenu = this.add.button((this.game.scale.bounds.width*2) - 174,
                                             (this.game.scale.bounds.height*2) - 80,
                                             'ingame-nav-bag',
                                             this.toggleBag,
                                             this);
        // ENABLE INPUT ON MENU
        this.ingameBagMenu.inputEnabled = true;
        this.ingameBagMenu.input.useHandCursor = true;
        
        // INSERT THE MENU BUTTON
        this.ingameMenuBtn = this.add.button(
            (this.game.scale.bounds.width*2) - 152,
            0,
            'ingame-menu-button',
            this.toggleMenu,
            this
        );
        // ENABLE INPUT ON MENU
        this.ingameMenuBtn.inputEnabled = true;
        this.ingameMenuBtn.input.useHandCursor = true;
        
        /**
         * INSERT WOOD COUNT
         */
        Chuck.woodCountTxt = this.add.bitmapText(130, (this.game.scale.bounds.height*2) - 72, 'cfont', "0000000");
        Chuck.woodCountTxt.fill = '#FFFFFF';
        Chuck.woodCountTxt.fontSize = 46;
        Chuck.PlayerActor.updateWood();

        this.gameGUI.addMultiple([
            this.ingameNav,
            this.ingameNavShop,
            this.ingameBagMenu,
            this.ingameMenuBtn,
            Chuck.woodCountTxt
        ]);

        /**
         * INSERT SHOP GUI
         */
        Chuck.ShopActor.create();
        this.gameShop.alpha = 0;
        Chuck.modal = false;
        
        /**
         * INSERT GAME MENU
         */
        Chuck.menu = false;
        this.gameMenu.alpha = 0;
        
        this.menuOverlay = this.add.sprite(
            0,
            0,
        'overlay');
        
        this.menuBtnMain = this.add.button(
            this.game.scale.bounds.width - 148,
            200,
            'menu-btn-main',
            this.goToMenu,
            this
        );
        
        this.menuBtnMute = this.add.button(
            this.game.scale.bounds.width - 148,
            this.menuBtnMain.y + this.menuBtnMain.height + 30,
            'menu-btn-mute',
            this.toggleSound,
            this
        );
        
        this.menuBtnMoreGames = this.add.button(
            this.game.scale.bounds.width - 148,
            this.menuBtnMute.y + this.menuBtnMute.height + 30,
            'menu-btn-more-games',
            this.moreGames,
            this
        );
        
        this.menuBtnResume = this.add.button(
            this.game.scale.bounds.width - 148,
            this.menuBtnMoreGames.y + this.menuBtnMoreGames.height + 90,
            'menu-btn-resume',
            this.toggleMenu,
            this
        );
        
        this.gameMenu.addMultiple(
            [
                this.menuOverlay,
                this.menuBtnMain,
                this.menuBtnMute,
                this.menuBtnMoreGames,
                this.menuBtnResume
            ]
        );
        
        this.menuBtnMain.inputEnabled = this.menuBtnMute.inputEnabled = this.menuBtnMoreGames.inputEnabled = this.menuBtnResume.inputEnabled = false;
        
        // ENABLE THE COLLISION OM THE FLOOR
        this.physics.enable(this.floor, Phaser.Physics.ARCADE);
        this.floor.body.immovable = true;
        
        this.game.input.onDown.add(function() {
            if (Chuck.gameData.tutorial == false) {
                if (this.tutorialPart == 1) {
                    this.tutorialPart1.alpha = 0;
                    this.tutorialPart2.alpha = 1;
                    this.tutorialPart = 2;
                } else if (this.tutorialPart == 2) {
                    this.tutorialPart2.alpha = 0;
                    this.tutorialPart3.alpha = 1;
                    this.tutorialPart = 3;
                } else if (this.tutorialPart == 3) {
                    this.tutorialPart3.alpha = 0;
                    this.tutorialPart4.alpha = 1;
                    this.tutorialPart = 4;
                } else if (this.tutorialPart == 4) {
                    this.tutorialPart4.alpha = 0;
                    this.tutorialPart = 5;
                    Chuck.gameData.tutorial = true;
                    this.chopZone.events.onInputDown.add(this.chop, this);
                }
            } else {
                Chuck.gameData.clicksTotal += 1;
                Chuck.AchievementsActor.checkAchievements("clicks");
                this.clickAnim = new Chuck.Click(this.game.input.x, this.game.input.y, this.game);
                this.clickAnim.create();
            }
        }, this);
        
        this.game.world.setProperty(this.gameEntities, "z", 100);
        this.game.world.setProperty(this.gamePowerups, "z", 500);
        this.game.world.setProperty(this.gameBag, "z", 800);
        this.game.world.setProperty(this.gameGUI, "z", 900); 
        this.game.world.setProperty(this.gameShop, "z", 1000);
        this.game.world.setProperty(this.gameMenu, "z", 1100);
        this.game.world.setProperty(this.tutorial, "z", 5000);
        this.game.world.sort('z');
	},

	update: function () {
        this.physics.arcade.collide(Chuck.PowerupActor.avatar, this.floor);
	},
    increaseWood: function (amt) {
        Chuck.gameData.woodCount = Chuck.gameData.woodCount + amt;
        Chuck.gameData.woodTotal = Chuck.gameData.woodTotal + amt;
        
        Chuck.AchievementsActor.checkAchievements("wood");
        
        Chuck.PlayerActor.updateWood();
    },
    chop: function() {
        this.toggleBag(true);
        if (!Chuck.TreeActor.isTweening && Chuck.modal == false) {
            if (Chuck.PlayerActor.animation == null || Chuck.PlayerActor.animation == "chuck-idle"){
                Chuck.PlayerActor.chop();
            }
        } else {
            Chuck.PlayerActor.animation = "chuck-idle";
        }
    },
    toggleMenu: function() {
        if (Chuck.menu) {
            /**
             * CLOSE THE BAG
             */
            Chuck.menu = false;
            this.menuBtnMain.inputEnabled = this.menuBtnMute.inputEnabled = this.menuBtnMoreGames.inputEnabled = this.menuBtnResume.inputEnabled = false;
            this.chopZone.inputEnabled = this.ingameMenuBtn.inputEnabled = this.ingameBagMenu.inputEnabled = this.ingameNavShop.inputEnabled = true;
            this.gameMenu.alpha = 0;
        } else {
            /**
             * OPEN THE BAG
             */
            Chuck.menu = true;
            this.chopZone.inputEnabled = this.ingameMenuBtn.inputEnabled = this.ingameBagMenu.inputEnabled = this.ingameNavShop.inputEnabled = false;
            this.menuBtnMain.inputEnabled = this.menuBtnMute.inputEnabled = this.menuBtnMoreGames.inputEnabled = this.menuBtnResume.inputEnabled = true;
            this.gameMenu.alpha = 1;
        }
    },
    toggleShop: function(forceClose) {
        /**
         * OPEN SHOP MODAL
         */
        this.game.world.sort('z');
        if (Chuck.modal || forceClose == true) {
            //Chuck.ShopActor.openTab = 'upgrades';
            Chuck.modal = false;
            
            /**
             * DISABLE INPUT ON SHOP ITEMS
             */
            Chuck.ShopActor.shopTabPowerup.inputEnabled = Chuck.ShopActor.shopTabUpgrades.inputEnabled = Chuck.ShopActor.shopTabUpgradesAxe.inputEnabled = Chuck.ShopActor.shopTabUpgradesPower.inputEnabled = Chuck.ShopActor.shopTabUpgradesSpeed.inputEnabled = Chuck.ShopActor.shopTabUpgradesLuck.inputEnabled = false;
            
            this.chopZone.inputEnabled = true;
            
            //this.game.world.sendToBack(this.gameShop);
            this.gameShop.alpha = 0;
        } else {
            Chuck.modal = true;
            this.toggleBag(true);
            /**
             * ENABLE INPUT ON SHOP ITEMS
             */
            Chuck.ShopActor.shopTabPowerup.inputEnabled = Chuck.ShopActor.shopTabPowerup.input.useHandCursor = Chuck.ShopActor.shopTabUpgrades.inputEnabled = Chuck.ShopActor.shopTabUpgrades.input.useHandCursor = Chuck.ShopActor.shopTabUpgradesAxe.inputEnabled = Chuck.ShopActor.shopTabUpgradesAxe.input.useHandCursor = Chuck.ShopActor.shopTabUpgradesPower.inputEnabled = Chuck.ShopActor.shopTabUpgradesPower.input.useHandCursor = Chuck.ShopActor.shopTabUpgradesSpeed.inputEnabled = Chuck.ShopActor.shopTabUpgradesSpeed.input.useHandCursor = Chuck.ShopActor.shopTabUpgradesLuck.inputEnabled = Chuck.ShopActor.shopTabUpgradesLuck.input.useHandCursor = true;
            
            this.chopZone.inputEnabled = false;
            
            this.gameShop.alpha = 1;
        }
	},
    toggleBag: function(forceClose) {
        if (Chuck.bag || forceClose == true) {
            /**
             * CLOSE THE BAG
             */
            Chuck.bag = false;
            this.chopZone.inputEnabled = true;
            this.chopZone.input.useHandCursor = true;
            this.bagTween = this.game.add.tween(this.gameBag).to({y : (this.game.scale.bounds.height*2) - 104}, 100, Phaser.Easing.Quadratic.InOut, true, 25, false);
        } else {
            /**
             * OPEN THE BAG
             */
            Chuck.bag = true;
            this.toggleShop(true);
            //this.chopZone.inputEnabled = false;
            //this.chopZone.input.useHandCursor = false;
            this.bagTween = this.game.add.tween(this.gameBag).to({y : (this.game.scale.bounds.height*2) - 320}, 100, Phaser.Easing.Quadratic.InOut, true, 25, false);
        }
	},
	toggleSound: function() {
        if (this.game.sound.mute) {
            this.game.sound.mute = false;
        } else {
            this.game.sound.mute = true;
        }
    },
	goToMenu: function() {
		this.state.start('Preloader');
	},
    moreGames: function() {
		var win = window.open("http://www.fyretale.com", '_blank');
        win.focus();
	},
    quitGame: function(pointer) {
		this.state.start('MainMenu');
	}
};