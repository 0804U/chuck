Chuck.PowerupActor = null;

Chuck.Powerup = function(x, y, game, group){
    this.x = x;
    this.y = y;
    this.game = game;
    this.group = group;
    this.currentState = this.game.state.getCurrentState();
};

Chuck.Powerup.prototype = {
    /**
     * THE POWERUP SPRITE
     */
    avatar : null,
    smallItems : ["powerup-small-apple",
                  "powerup-small-cherry",
                  "powerup-small-orange"
                 ],
    otherItems : ["powerup-acorn",
                  "powerup-birdnest"
                 ],
    itemGroup: null,
    itemType: null,
    
    create: function(dropRate) {
        /**
         * RANDOM NUMBER BETWEEN 1 and 100
         */
        var rndNo = Math.floor(Math.random() * dropRate);
        console.log(rndNo);
        
        if (rndNo <= (dropRate/4)*3) {
            /**
             * GENERATE A SMALL ITEM
             */
            this.itemGroup = "smallItem";
            this.itemType = this.smallItems[Math.floor(Math.random() * this.smallItems.length)];
            this.avatar = this.game.add.sprite(this.x, this.y, this.itemType);
        } else {
            /**
             * GENERATE AN OTHER ITEM
             */
            this.itemGroup = "otherItem";
            if (rndNo >= (dropRate - ((dropRate/4)*1)) + ((((dropRate/4)*1)/3)*2)) {
                this.itemType = this.otherItems[1];
            } else {
                this.itemType = this.otherItems[0];
            }
            this.avatar = this.game.add.sprite(this.x, this.y, this.itemType);
        }
        
        if (this.avatar) {
            Chuck.powerupExists = true;
            this.avatar.inputEnabled = true;
            this.avatar.events.onInputDown.add(this.collectItem, this);

            this.avatar.anchor.setTo(0.5, 1);

            this.game.physics.enable(this.avatar, Phaser.Physics.ARCADE);

            this.avatar.body.gravity.set(0, 1000);
            this.avatar.body.bounce.set(0.3);
            this.group.add(this.avatar);
        }
    },
    update: function() {
        /**
         * ARE WE DOING AN ACTION
         */
    },
    collectItem: function() {
        switch (this.itemGroup) {
            case "smallItem":
                if (Chuck.gameData.inventoryArray.length < Chuck.gameData.inventorySpace) {
                    this.collectAnim(this.avatar);
                    Chuck.gameData.inventoryArray.push(this.itemType);
                    Chuck.InventoryActor.updateInventory();
                    Chuck.gameData.fruitTotal += 1;
                    Chuck.AchievementsActor.checkAchievements("fruit");
                    Chuck.PlayerActor.talk("AWWYISS", 30, 66, 20);
                    Chuck.powerupExists = false;
                } else {
                    Chuck.PlayerActor.talk("NO ROOM!", 30, 66, 20);
                    this.bounceItem(this.avatar);
                }
            break;
            case "otherItem":
                switch (this.itemType) {
                    case "powerup-acorn":
                        /* Acorn */
                        this.currentState.increaseWood(50);
                        Chuck.gameData.acornTotal += 1;
                        Chuck.AchievementsActor.checkAchievements("acorn");
                        Chuck.PlayerActor.talk("+50", 54, 50, 30);
                    break;
                    case "powerup-birdnest":
                        /* Birdnest */
                        this.currentState.increaseWood(125);
                        Chuck.gameData.nestTotal += 1;
                        Chuck.AchievementsActor.checkAchievements("nest");
                        Chuck.PlayerActor.talk("+125", 54, 58, 30);
                    break;
                }
                this.avatar.kill();
                Chuck.powerupExists = false;
            break;
        }
    },
    collectAnim: function(item) {
        this.game.add.tween(item).to(
            {
                x: (this.game.scale.bounds.width*2) - 50,
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
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function() {
            item.kill();
        }, this);
    },
    bounceItem: function(item) {
        if (item.body.velocity.y < 0) {
            item.body.velocity.y = -350;
        }
    }
}