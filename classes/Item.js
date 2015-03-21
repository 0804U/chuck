Chuck.Item = function(x, y, game, group, itemType, slot){
    this.x = x;
    this.y = y;
    this.game = game;
    this.group = group;
    this.itemType = itemType;
    this.slot = slot;
};

Chuck.Item.prototype = {
    avatar : null,
    create: function() {
        this.avatar = this.game.add.button(
            this.x,
            this.y,
            this.itemType,
            this.consume,
            this
        );
        this.group.add(this.avatar);
        
        this.avatar.inputEnabled = this.avatar.input.useHandCursor = true;
    },
    consume: function() {
        if (Chuck.bag) {
            Chuck.gameData.inventoryArray.splice(this.slot, 1);
            Chuck.InventoryActor.updateInventory();

            switch(this.itemType){
                case "powerup-small-apple":
                    Chuck.PlayerActor.powerBuff += 6;
                    this.game.time.events.add(Phaser.Timer.SECOND * (5 + (Chuck.gameData.luck/2)), function() {
                        Chuck.PlayerActor.powerBuff -= 6;
                    }, this);
                    break;
                case "powerup-small-orange":
                    Chuck.PlayerActor.speedBuff += 40;
                    Chuck.PlayerActor.chopAnimForward.speed = Chuck.PlayerActor.chopAnimBack.speed = Chuck.PlayerActor.getPlayerSpeed();
                    this.game.time.events.add(Phaser.Timer.SECOND * (5 + (Chuck.gameData.luck/2)), function() {
                        Chuck.PlayerActor.speedBuff -= 40;
                        Chuck.PlayerActor.chopAnimForward.speed = Chuck.PlayerActor.chopAnimBack.speed = Chuck.PlayerActor.getPlayerSpeed();
                    }, this);
                    break;
                case "powerup-small-cherry":
                    Chuck.PlayerActor.luckBuff += 8;
                    this.game.time.events.add(Phaser.Timer.SECOND * (5 + (Chuck.gameData.luck/2)), function() {
                        Chuck.PlayerActor.luckBuff -= 8;
                    }, this);
                    break;
            }

            return;
        }
    }
}