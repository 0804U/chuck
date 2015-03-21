Chuck.Log = function(x, y, game){
    this.x = x;
    this.y = y;
    this.game = game;
};

Chuck.Log.prototype = {
    /**
     * THE LOG SPRITE
     */
    avatar : null,
    
    create: function() {
        /**
         * CREATE THE LOG
         */
        this.avatar = this.game.add.sprite(this.x, this.y, 'item-log');
        
        /**
         * CREATE THE LOG
         */
        this.game.physics.enable(this.avatar, Phaser.Physics.ARCADE);
        
        this.avatar.body.gravity.set(0, 800);
        this.avatar.body.bounce.set(0.3);
        var num = Math.floor(Math.random() * 200) + 1;
            num *= Math.floor(Math.random() *2 ) == 1 ? 1 : -1;
        this.avatar.body.velocity.x = num;
        this.avatar.body.velocity.y = (Math.floor(Math.random() * 250) + 150) * -1;
        /**
         * WAIT TIME BEFORE ENTER
         */
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            this.tween = this.game.add.tween(this.avatar).to(
                {
                    x: 30,
                    y: (this.game.scale.bounds.height*2) - 60,
                    alpha: 0,
                    width: this.avatar.width/3,
                    height: this.avatar.height/3
                },
                250,
                Phaser.Easing.Quadratic.InOut,
                true,
                0,
                false
            );
            this.tween.onComplete.add(function() {
                this.avatar.kill();
            }, this);
        }, this);
    },
    update: function() {
        /**
         * ARE WE DOING AN ACTION
         */
    }
}