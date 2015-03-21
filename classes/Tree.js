Chuck.TreeActor = null;

Chuck.Tree = function(game, group){
    this.game = game;
    this.group = group;
    this.currentState = this.game.state.getCurrentState();
};

Chuck.Tree.prototype = {
    /**
     * THE AVATAR'S SPRITE
     */
    avatar : null,
    cracks : null,
    
    /**
     * THE BASE TREE HEIGHT
     */
    treeHeight : 8,
    treeX : 0,
    treeY : 0,
    treeParts: null,
    activeTreePart: null,
    activeTreePartCracks: 0,
    activeTreePartCracksTotal: 9,
    
    /**
     * WAIT TIME BETWEEN CHOPS
     */
    animation : null,

    /**
     * THE ACTION OF THE CUSTOMER
     */
    action : null,

    /**
     * IS THE CUSTOMER'S ACTION COMPELTE
     */
    complete : true,
    
    /**
     * IS THE CUSTOMER'S ACTION WAITING
     */
    waiting : false,
    
    create: function() {
        /**
         * SET THE OFFSET OF THE TREE
         */
        this.treeX = (this.game.scale.bounds.width) - 104;
        this.treeY = (this.game.scale.bounds.height*2) - 368;
        
        /**
         * CREATE A GROUP FOR THE TREE PARTS
         */
        this.treeParts = this.game.add.group();
        
        /**
         * CREATE ALL THE TREE PIECES
         */
        for (i = 0; i < this.treeHeight; i++) {
            var rndPiece = Math.floor(Math.random() * 6) + 1;
            this.treeParts.create(this.treeX, this.treeY - (104 * i), 'tree-piece-' + rndPiece);
        }
        
        /**
         * CREATE THE CRACK SPRITE
         */
        this.cracks = this.game.add.sprite(0, 0, 'tree-crack');
        
        /**
         * HIDE THE CRACKS
         */
        this.cracks.alpha = 0;
        this.group.addMultiple([
            this.treeParts,
            this.cracks
        ]);
    },
    update: function() {
        /**
         * ARE WE DOING AN ACTION
         */
    },
    grow: function() {
        /**
         * IF THE TREE IS NOT FALLING
         */
        if (!this.isTweening) {
            /**
             * MAKE EACH PART OF THE TREE FALL
             */
            var chopSpeed = Chuck.PlayerActor.getPlayerSpeed();
            this.treeParts.forEachAlive(function(part) {
                this.isTweening = true;
                var tempY = part.y + 104;
                this.treeTween = this.game.add.tween(part).to({y : tempY}, Math.max(1, 150 - (chopSpeed * 4)), Phaser.Easing.Quadratic.InOut, true, Math.max(1, 150 - (chopSpeed * 4)), false);
                
                /**
                 * ON FALL COMPLETE, SET FALLING TO FALSE
                 */
                this.treeTween.onComplete.add(function() {
                    this.isTweening = false;
                }, this);
            }, this);
        }
        
        /**
         * CREATE THE A NEW PIECE OF THE TREE
         */
        var rndPiece = Math.floor(Math.random() * 6) + 1;
        this.treeParts.create(this.treeX, this.treeY - (104 * this.treeParts.countLiving()), 'tree-piece-' + rndPiece);
    },
    crack: function() {
        /**
         * GET THE OLDEST TREE PART
         */
        this.activeTreePart = this.treeParts.getFirstAlive();
        
        /**
         * IF THE TREE ISN'T TWEENING
         */
        if (!this.isTweening) {
            /**
             * IF THE PART HAS CRACKS LEFT, ANIMATE.
             */
            if (this.activeTreePartCracks <= this.activeTreePartCracksTotal && (this.activeTreePartCracksTotal-this.activeTreePartCracks) >= Chuck.PlayerActor.getPlayerPower()) {
                /**
                 * INCREASE THE CUTS BY THE PLAYERS POWER
                 */
                this.activeTreePartCracks += Chuck.PlayerActor.getPlayerPower();
                
                /**
                 * SHOW THE CRACKS
                 */
                this.cracks.alpha = 1;
                
                /**
                 * SET THE POSITION OF THE CRACKS TO THE ACTIVE TREE PART
                 */
                this.cracks.x = this.activeTreePart.x;
                this.cracks.y = this.activeTreePart.y;
                
                /**
                 * SET THE FRAME OF THE CRACK ANIMATION TO THE CRACK NUMBER
                 */
                this.cracks.frame = Math.floor(this.activeTreePartCracks);
                
                /**
                 * UPDATE THE WOOD COUNT
                 */
                this.currentState.increaseWood(1);
                
                //Chuck.PlayerActor.updateWood();
            } else {
                /**
                 * SPAWN LOG ITEM ON COMPLETE CUT
                 */
                this.log = new Chuck.Log((this.game.scale.bounds.width) - 90, (this.game.scale.bounds.height*2) - 320, this.game, this.time);
                this.log.create();
                
                /**
                 * UPDATE THE WOOD COUNT
                 */
                this.currentState.increaseWood(1 + (4 * Chuck.PlayerActor.getPlayerLuck()));
                
                /**
                 * HIDE THE CRACK SPRITE
                 */
                this.cracks.alpha = 0;
                
                /**
                 * RESET THE NUMBER OF CRACKS
                 */
                this.activeTreePartCracks = 0;
                
                /**
                 * REMOVE THE CUT PART OF THE TREE
                 */
                this.activeTreePart.kill();
                
                /**
                 * GROW A PART AT THE TOP
                 */
                this.grow();
            }
        }
    }
}