Chuck.Speech = function(game, message, fontSize, xPos, yPos){
    this.x = Chuck.PlayerActor.x + 78;
    this.y = Chuck.PlayerActor.y - 66;
    this.game = game;
    this.message = message;
    this.txtSize = fontSize;
    this.xPos = xPos;
    this.yPos = yPos;
};

Chuck.Speech.prototype = {
    avatar : null,
    speechAnimation : null,
    
    create: function() {
        this.avatar = this.game.add.sprite(this.x, this.y, 'chuck-speech');
        this.avatar.anchor.setTo(0.5);
        this.speechAnimation = this.avatar.animations.add('speech-loop', [0,1,2], 12, false);
        this.speechCloseAnimation = this.avatar.animations.add('speech-loop-close', [2,1,0], 12, false);

        this.messageTxt = this.game.add.bitmapText(
            //this.x + (this.avatar.width/2),
            this.avatar.x - this.xPos,
            this.avatar.y - this.yPos,
            'cfont',
            this.message
        );

        this.messageTxt.align = 'center';
        this.messageTxt.opacity = 0;
        this.messageTxt.fontSize = this.txtSize;
        this.messageTxt.tint = '#000000';

        /* console.log(this.messageTxt.x);

        this.messageTxt.x -= (this.messageTxt.textWidth) - 6;
        console.log(this.messageTxt.x);
        this.messageTxt.y -= 20; */
        
        this.playState = this.game.state.getCurrentState();
        this.playState.gameGUI.addMultiple(
            [
                this.avatar,
                this.messageTxt
            ]
        );

        this.avatar.animations.play("speech-loop");

        this.speechAnimation.onComplete.add(function() {
            this.messageTxt.opacity = 1;
        }, this);

        this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
            this.messageTxt.destroy();
            this.avatar.animations.play("speech-loop-close");
        }, this);

        this.speechCloseAnimation.onComplete.add(function() {
            this.avatar.kill();
            Chuck.PlayerActor.talking = false;
        }, this);
    },
    update: function() {
        /**
         * ARE WE DOING AN ACTION
         */
    }
}