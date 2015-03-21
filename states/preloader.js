Chuck.Preloader = function (game) {

};

Chuck.Preloader.prototype = {

	preload: function () {
        /**
         * REQUEST THE ASSETS LOADED IN THE BOOT SEQUENCE
         */
        this.preloadGroup = this.add.group();
        
        this.background = this.add.sprite(0, 0, 'menu-background');
		this.logo = this.add.sprite(13, 190, 'menu-logo');
		this.fyretale = this.add.sprite(0, (this.game.scale.bounds.height * 2) - 100, 'fyretale-logo');
		this.fyretaleLoading = this.add.sprite(0, (this.game.scale.bounds.height * 2) - 100, 'fyretale-loading');
        this.buttonPlay = this.add.button(320, 500, 'button-play', this.startGame, this);
        this.buttonPlay.anchor.setTo(0.5);
        this.buttonPlay.alpha = 0;
        
        this.loadingText = this.add.bitmapText((this.game.scale.bounds.width * 2) - 220, (this.game.scale.bounds.height*2) - 66, 'cfont', "LOADING");
        this.loadingText.fill = '#FFFFFF';
        this.loadingText.fontSize = 48;
        
        this.loadTween = this.game.add.tween(this.loadingText).to(
            {
                alpha: 0,
            },
            1000,
            Phaser.Easing.Quadratic.InOut,
            true,
            0,
            Number.MAX_VALUE,
            true
        );
        
        this.preloadGroup.addMultiple(
            [
                this.background,
                this.logo,
                this.fyretale,
                this.fyretaleLoading,
                this.buttonPlay
            ]
        );
        
        this.buttonPlay.inputEnabled = true;
        this.buttonPlay.input.useHandCursor = true;

		/**
         * INITIATE PRELOADER ANIMATION
         */
		this.load.setPreloadSprite(this.fyretaleLoading);

		/**
         * QUEUE ASSETS TO BE PRELOADED
         */
        
            /**
             * MENU ASSETS
             */
            //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
            
            /**
             * IN GAME ASSETS
             */
            this.load.image('ingame-background', 'assets/ingame-bg.png');
            this.load.image('achievements-background', 'assets/achievements-bar.png');
            this.load.image('overlay', 'assets/overlay.png');
            this.load.image('ingame-nav', 'assets/gui-bg.png');
            this.load.image('ingame-menu-button', 'assets/button-menu.png');
            this.load.image('ingame-nav-upgrades', 'assets/button-upgrades.png');
            this.load.image('ingame-nav-bag', 'assets/button-bag.png');
            this.load.image('ingame-tree-stump', 'assets/maintree-trunk.png');
        
            this.load.spritesheet('click-sprite', 'assets/spritesheet-click.png', 88, 88);
            this.load.spritesheet('chuck-speech', 'assets/speechbubble-spritesheet.png', 184, 152);
            this.load.spritesheet('chuck-chop', 'assets/chuck/chuck-spritesheet.png', 192, 256);
            this.load.spritesheet('tree-crack', 'assets/crack/crack-spritesheet.png', 208, 104);
        
            this.load.image('achievements-icon-wood', 'assets/woodicon-transparent.png');
            this.load.image('achievements-icon-clicks', 'assets/clickicon-transparent.png');
            this.load.image('achievements-icon-fruit', 'assets/fruiticon-transparent.png');
            this.load.image('achievements-icon-acorn', 'assets/acornicon-transparent.png');
            this.load.image('achievements-icon-nest', 'assets/nesticon-transparent.png');
        
            this.load.image('menu-btn-main', 'assets/button-mainmenu.png');
            this.load.image('menu-btn-mute', 'assets/button-mute.png');
            this.load.image('menu-btn-more-games', 'assets/button-moregames.png');
            this.load.image('menu-btn-resume', 'assets/button-resume.png');
        
            this.load.image('item-log', 'assets/item-log.png');
            this.load.image('ingame-bag', 'assets/inventory.png');
        
            this.load.image('tree-piece-1', 'assets/maintree-body1.png');
            this.load.image('tree-piece-2', 'assets/maintree-body2.png');
            this.load.image('tree-piece-3', 'assets/maintree-body3.png');
            this.load.image('tree-piece-4', 'assets/maintree-body4.png');
            this.load.image('tree-piece-5', 'assets/maintree-body5.png');
            this.load.image('tree-piece-6', 'assets/maintree-body6.png');
        
            this.load.image('tutorial-part-1', 'assets/tutorial-bag.png');
            this.load.image('tutorial-part-2', 'assets/tutorial-upgrades.png');
            this.load.image('tutorial-part-3', 'assets/tutorial-menu.png');
            this.load.image('tutorial-part-4', 'assets/tutorial-tap.png');
            this.load.image('tutorial-arrow', 'assets/tutorial-arrow.png');
        
            /**
             * SHOP ASSETS
             */
            this.load.image('shop-bg', 'assets/modal-bg.png');
            this.load.image('shop-tab-powerup', 'assets/tab-achievements.png');
            this.load.image('shop-tab-upgrades', 'assets/tab-upgrades.png');
            this.load.image('shop-tab-upgrades-axe', 'assets/upgrades-axe.png');
            this.load.image('shop-tab-upgrades-clocks', 'assets/upgrades-clocks.png');
            this.load.image('shop-tab-upgrades-clover', 'assets/upgrades-clover.png');
            this.load.image('shop-tab-upgrades-muscle', 'assets/upgrades-muscle.png');
            this.load.image('shop-tab-price', 'assets/description-bar.png');
            this.load.image('shop-tab-currency', 'assets/icon-woodcurrency.png');

            this.load.image('shop-tab-powerups-small-apple', 'assets/powerup-appleicon.png');
            this.load.image('shop-tab-powerups-small-orange', 'assets/powerup-orangeicon.png');
            this.load.image('shop-tab-powerups-small-cherry', 'assets/powerup-cherryicon.png');
        
            this.load.image('shop-tab-achievement-wood', 'assets/achievements-woodicon.png');
            this.load.image('shop-tab-achievement-clicks', 'assets/achievements-clickicon.png');
            this.load.image('shop-tab-achievement-fruit', 'assets/achievements-fruiticon.png');
            this.load.image('shop-tab-achievement-acorn', 'assets/achievements-acornicon.png');
            this.load.image('shop-tab-achievement-nest', 'assets/achievements-nesticon.png');
            
            this.load.spritesheet('shop-tab-achievement', 'assets/achievements/achievement-spritesheet.png', 352, 48);
        
            /**
             * POWERUPS
             */
            this.load.image('powerup-small-apple', 'assets/powerup-small-apple.png');
            this.load.image('powerup-small-cherry', 'assets/powerup-small-cherry.png');
            this.load.image('powerup-small-orange', 'assets/powerup-small-orange.png');
        
            this.load.image('powerup-acorn', 'assets/item-acorn.png');
            this.load.image('powerup-birdnest', 'assets/item-birdnest.png');
        
            this.load.audio('themeMusic', ['assets/theme.mp3']);
            this.load.audio('chopSound', ['assets/chop.wav']);
            this.load.audio('achievementSound', ['assets/achievement.mp3']);
	},

	create: function () {
        /**
         * PAUSE AFTER PRELOAD TO ALLOW FINAL DECODING TO FINISH
         */
		this.fyretaleLoading.cropEnabled = false;
        
        this.game.tweens.remove(this.loadTween);
        this.game.add.tween(this.loadingText).to(
            {
                alpha: 1,
            },
            1000,
            Phaser.Easing.Quadratic.InOut,
            true,
            0,
            0,
            false
        );
        this.loadingText.text = "READY!";
        this.loadingText.x = (this.game.scale.bounds.width * 2) - 180;
        
        this.buttonPlay.width = this.buttonPlay.height = 0;
        this.buttonPlay.alpha = 1;
        
        this.game.add.tween(this.buttonPlay).to(
            {
                width: 160,
                height: 104
            },
            300,
            //Phaser.Easing.Quadratic.InOut,
            Phaser.Easing.Bounce.Out,
            true,
            0,
            0,
            false
        );
        
        //this.state.start('MainMenu');
	},

	update: function () {
        /**
         * WAIT FOR MUSIC TO BE FULLY DECODED BEFORE PROCEEDING
         * 
         * IF THIS GAME HAS NO MUSIC, MOVE 'THIS.STATE.START' INTO THE CREATE FUNCTION AND REMOVE UPDATE FUNCTION
         
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
			this.ready = true;
			this.state.start('MainMenu');
		}
        */
	},
    startGame: function (pointer) {
        this.preloadGroup.destroy(true);
		this.state.start('Play');
	}
};