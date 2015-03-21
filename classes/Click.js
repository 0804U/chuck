Chuck.Click = function(x, y, game){
    this.x = x;
    this.y = y;
    this.game = game;
};

Chuck.Click.prototype = {
    avatar : null,
    
    create: function() {
        this.avatar = this.game.add.sprite(
            (this.x * 2) - 42,
            (this.y * 2) - 40,
            'click-sprite'
        );
        
        this.clickAnimation = this.avatar.animations.add('animate', [0,1,2], 24, false);
        this.avatar.animations.play("animate");

        this.avatar.events.onAnimationComplete.add(function() {
            this.avatar.kill();
        }, this);
    },
    update: function() {
        /**
         * ARE WE DOING AN ACTION
         */
    }
}