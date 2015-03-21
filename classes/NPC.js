BentoBustle.ActiveCustomer = null;
BentoBustle.Customer = function(x, y, name, group, game, time){
    this.x = x;
    this.y = y;
	this.name = name;
	this.group = group;
    this.game = game;
};

BentoBustle.Customer.prototype = {
    /**
     * THE AVATAR'S SPRITE
     */
    avatar : null,
    
    /**
     * THE ORDER SPRITE
     */
    orderSprite : null,
    
    /**
     * THE ORDER SPRITE
     */
    orderID : 0,
    
    /**
     * X POSITION TO SPAWN
     */
    spawnX : 750,
    
    /**
     * THE ACTION OF THE CUSTOMER
     */
    action : null,
    
    /**
     * TIME FOR THE TIMER TO WAIT
     */
    waitTime : 0,
    
    /**
     * SELECT A RANDOM CUSTOMER
     */
    rndCustomer : 0,
    
    /**
     * IS THE CUSTOMER'S ACTION COMPELTE
     */
    complete : false,
    
    /**
     * IS THE CUSTOMER'S ACTION WAITING
     */
    waiting : false,
    
    create: function() {
         /**
         * GENERATE A RANDOM CUSTOMER SPRITE
         */
        this.rndCustomer = Math.floor(Math.random() * 6) + 1;
        
        /**
         * CREATE CUSTOMER AND ADD TO GROUP
         */
        this.avatar = this.game.add.sprite(this.spawnX, this.y, 'npcCustomer' + this.rndCustomer);
        this.avatar.anchor.setTo(0.5, 0.5);
        this.group.addChild(this.avatar);
        
        /**
         * ENABLE ARCADE PHYSICS
         */
        this.game.physics.enable(this.avatar, Phaser.Physics.ARCADE);
        
        /**
         * SET VELOCITY TO 0
         */
        this.avatar.body.velocity.x = 0;
        
        /**
         * SET RANDOM WAIT
         */
        this.waitTime = (Math.random() * 10) + 1;
        
        /**
         * WAIT TIME BEFORE ENTER
         */
        this.game.time.events.add(Phaser.Timer.SECOND * this.waitTime, function() {
            this.action = "enter";
            console.log(this.action);
        }, this);
    },
    update: function() {
        /**
         * ARE WE DOING AN ACTION
         */
        if (this.action == null) {
            return;
        } else {
            /**
             * SWITCH THROUGH POSSIBLE ACTIONS
             */
            switch (this.action) {
                case "enter":
                    /**
                     * IF THE CUSTOMER HASN'T FINISHED ENTERING
                     */
                    if (!this.complete) {
                        /**
                         * IF THE CUSTOMER ISN'T IN THE PROCESS OF ENTERING
                         */
                        if (!this.waiting) {
                            /**
                             * MOVE THE CUSTOMER TO THE SEAT
                             */
                            //console.log("Move to seat.");
                            this.waiting = true;
                            this.game.physics.arcade.moveToXY(this.avatar, this.x, this.y, 250, 500);
                        } else {
                            /**
                             * IF THE CUSTOMER HAS ARRIVED AT THE SEAT
                             */
                            if (Math.floor(this.avatar.x) <= this.x) {
                                this.avatar.body.velocity.x = 0;
                                this.avatar.x = this.x;
                                this.action = "readingMenu";
                                this.waiting = false;
                                this.complete = false;
                            } else {
                                //return;
                            }
                        }
                    }
                break;
                case "readingMenu":
                    /**
                     * IF THE CUSTOMER HASN'T FINISHED READING THE MENU
                     */
                    if (!this.complete) {
                        /**
                         * IF THE CUSTOMER ISN'T IN THE PROCESS OF READING THE MENU
                         */
                        if (!this.waiting) {
                            /**
                             * WAIT RANDOM TIME BEFORE ORDERING
                             */
                            //console.log("Read the menu.");
                            this.waiting = true;
                            this.waitTime = (Math.random() * 5) + 4;
                            this.game.time.events.add(Phaser.Timer.SECOND * this.waitTime, function() {
                                this.action = "order";
                                this.complete = false;
                                this.waiting = false;
                            }, this);
                        } else {
                            return;
                        }
                    }
                break;
                case "order":
                    /**
                     * IF THE CUSTOMER HASN'T FINISHED ORDERING
                     */
                    if (!this.complete) {
                        /**
                         * IF THE CUSTOMER ISN'T IN THE PROCESS OF ORDERING
                         */
                        if (!this.waiting) {
                            /**
                             * PLACE AN ORDER
                             */
                            //console.log("Place order.");
                            this.waiting = true;
                            this.orderSprite = this.game.add.sprite(this.avatar.x - 105, this.avatar.y - 45, 'order');
                            this.orderSprite.anchor.setTo(0.5, 0.5);
                            this.orderSprite.inputEnabled = true;
                            this.orderSprite.events.onInputDown.add(this.giveOrder, this);
                        } else {
                            return;
                        }
                    }
                break;
                case "waitingForMeal":
                    /**
                     * IF THE CUSTOMER HASN'T FINISHED ORDERING
                     */
                    if (!this.complete) {
                        /**
                         * IF THE CUSTOMER ISN'T IN THE PROCESS OF ORDERING
                         */
                        if (!this.waiting) {
                            /**
                             * PLACE AN ORDER
                             */
                            //console.log("Place order.");
                            this.waiting = true;
                            
                        } else {
                            return;
                        }
                    }
                break;
                case "leave":
                    if (!this.waiting) {
                        console.log("Leave");
                        this.waiting = true;
                        this.game.physics.arcade.moveToXY(this.avatar, this.spawnX, this.y, 250, 500);
                        if (Math.floor(this.avatar.x) == this.spawnX) {
                            this.avatar.body.velocity.x = 0;
                            this.avatar.x = this.spawnX;
                            this.action = "kill";
                            this.waiting = false;
                        }
                    }
                break;
                default:
                    //this.avatar.body.velocity.x = 0;
                break;
            }
        }
    },
    giveOrder: function() {
        this.orderID = Math.floor(Math.random() * 6) + 1;
        BentoBustle.ActiveCustomer = this;
        BentoBustle.PlayerActor.takeOrder(this);
    },
    waitForMeal: function() {
        this.orderSprite.destroy();
        this.orderSprite = this.game.add.sprite(this.avatar.x - 105, this.avatar.y - 45, 'order' + this.orderID);
        this.orderSprite.anchor.setTo(0.5, 0.5);
        this.orderSprite.inputEnabled = true;
        this.orderSprite.events.onInputDown.add(BentoBustle.PlayerActor.deliverOrder, this);
        this.complete = false;
        this.waiting = false;
        this.action = "waitingForMeal"; 
    }
}