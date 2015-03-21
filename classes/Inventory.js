Chuck.InventoryActor = null;

Chuck.Inventory = function(game, group){
    this.game = game;
    this.group = group;
};

Chuck.Inventory.prototype = {
    avatar : null,
    inventoryGroup : null,
    inventoryX : 28,
    inventoryY : 32,
    tempItem : null,
    create: function() {
        this.inventoryGroup = this.game.add.group();
        this.itemGroup = this.game.add.group();
        
        this.avatar = this.game.add.sprite(
            0,
            0,
            'ingame-bag'
        );

        this.updateInventory();
        
        this.group.addMultiple([this.avatar, this.inventoryGroup]);
    },
    updateInventory: function() {
        this.itemGroup.removeAll(true);
        var loopCount = 0;
        for (i = 0; i < Chuck.gameData.inventoryArray.length; i++) {
            if (i < 6) {
                this.tempItem = new Chuck.Item(this.inventoryX + (loopCount * 103), this.inventoryY, this.game, this.itemGroup, Chuck.gameData.inventoryArray[i], i);
            } else {
                this.tempItem = new Chuck.Item(this.inventoryX + ((loopCount - 6) * 103), this.inventoryY + 96, this.game, this.itemGroup, Chuck.gameData.inventoryArray[i], i);
            }
            
            this.tempItem.create();
            loopCount++;
        }
        
        this.inventoryGroup.add(this.itemGroup);
    }
}