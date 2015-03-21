Chuck.PlayerActor = null;

Chuck.Player = function(x, y, game, group){
    this.x = x;
    this.y = y;
    this.game = game;
    this.group = group;
};

Chuck.Player.prototype = {
    avatar : null,
    speech : null,
    animation : null,
    idleEvent: null,
    waitChop : 1000,
    basePower: 0,
    baseSpeed: 15, /* 15 FPS */
    baseLuck: 0, /* 15 FPS */
    powerBuff: 0,
    speedBuff: 0,
    luckBuff: 0,
    talking: false,
    chopSound: null,
    create: function() {
        /**
         * CREATE THE PLAYER SPRITE
         */
        this.avatar = this.game.add.sprite(this.x, this.y, 'chuck-chop');
        
        this.chopSound = this.game.add.audio('chopSound');

        /**
         * CREATE THE PLAYER ANIMATIONS
         */
        this.chopAnimForward = this.avatar.animations.add('chop', [0,1,2], this.getChopSpeed(), false);
        //this.chopAnimForward = this.avatar.animations.add('chop', [0,1,2], this.getChopSpeed(), false);
        this.chopAnimBack = this.avatar.animations.add('chop-back', [3,4], this.getChopSpeed(), false);
        this.idleAnim = this.avatar.animations.add('chuck-idle', [5,6], 1.5, true);
        
        this.avatar.animations.play("chuck-idle");
        
        this.avatar.events.onAnimationComplete.add(this.chopAnim, this);

        this.avatar.anchor.setTo(0, 0);
        this.group.add(this.avatar);
    },
    update: function() {
        
    },
    talk: function(msg, fontSize, xPos, yPos) {
        if (!this.talking) {
            this.talking = true;
            this.speech = new Chuck.Speech(this.game, msg, fontSize, xPos, yPos);
            this.speech.create();
        }
    },
    chop: function() {
        this.game.time.events.remove(this.idleEvent);
        this.animation = "chop";
        this.avatar.animations.play(this.animation, this.getChopSpeed());
    },
    chopAnim: function() {
        if (this.animation == "chop") {
            this.animation = "chop-back";
            Chuck.TreeActor.crack();
            /**
             * INSERT RANDOM ITEM
             */
            var rndDrop = Math.floor(Math.random() * 1000);
            var dropRate = 15 + (5 * Chuck.PlayerActor.getPlayerLuck());

            if (rndDrop <= dropRate && !Chuck.powerupExists) {
                Chuck.PowerupActor.create(dropRate);
            }
            this.chopSound.play();
            this.avatar.animations.play(this.animation, this.getChopSpeed());
        } else if (this.animation == "chop-back") {
            this.animation = "chuck-idle";
            this.avatar.animations.stop(true);
            this.idleEvent = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
                this.avatar.animations.play(this.animation);
            }, this);
        }
    },
    updateWood: function() {
        var newWood = '' + Chuck.gameData.woodCount;
        while (newWood.length < 7) {
            newWood = '0' + newWood;
        }
        Chuck.woodCountTxt.text = newWood;
    },  
    saveGameData: function() {
        /**
         * SAVE THE LOCAL DATA
         */
        localStorage.setItem('chuckGameData', JSON.stringify(Chuck.gameData));
    },
    getChopSpeed: function() {
        return Math.max(15, this.getPlayerSpeed());
    },
    getPlayerPower: function() {
        return Math.floor(Chuck.PlayerActor.basePower + (Chuck.gameData.axe/2) + (Chuck.gameData.power/2) + Chuck.PlayerActor.powerBuff);
    },
    getPlayerSpeed: function() {
        return Math.floor(Chuck.PlayerActor.baseSpeed + (Chuck.gameData.axe/2) + (Chuck.gameData.speed/2) + Chuck.PlayerActor.speedBuff);
    },
    getPlayerLuck: function() {
        return Math.floor(Chuck.PlayerActor.baseLuck + (Chuck.gameData.axe/2) + (Chuck.gameData.luck/2) + Chuck.PlayerActor.luckBuff);
    }
}