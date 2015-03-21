Chuck.AchievementsActor = null;

Chuck.Achievements = function(game){
    this.game = game;
    this.currentState = this.game.state.getCurrentState();
    this.isAnimating = false;
};

Chuck.Achievements.prototype = {
    create: function() {
        this.achievementSound = this.game.add.audio('achievementSound');
        this.achievementGroup = this.game.add.group();
        this.achievementGroup.x = 0;
        this.achievementGroup.y = (this.game.scale.bounds.height*2) - 100;
        
        this.achievementBG = this.game.add.sprite(
            0,
            0,
            'achievements-background'
        );
        
        this.achievementIcon = this.game.add.sprite(
            16,
            22,
            'achievements-icon-wood'
        );
        
        this.achievementTitle = this.game.add.bitmapText(120, this.achievementBG.y + 20, 'cfont', "ACHIEVEMENT UNLOCKED!");
        this.achievementMessage = this.game.add.bitmapText(120, this.achievementBG.y + 52, 'cfont', "");
        this.achievementSubMessage = this.game.add.bitmapText(120, this.achievementMessage.y + 32, 'cfont', "");
        this.achievementSubMessage.fill = this.achievementMessage.fill = this.achievementTitle.fill = '#FFFFFF';
        this.achievementTitle.fontSize = 32;
        this.achievementMessage.fontSize = 32;
        this.achievementSubMessage.fontSize = 32;
            
        this.achievementGroup.addMultiple(
            [
                this.achievementBG,
                this.achievementIcon,
                this.achievementTitle,
                this.achievementMessage,
                this.achievementSubMessage
            ]
        );
        
        this.currentState.gameGUI.add(this.achievementGroup);
    },
    update: function() {
        /**
         * ARE WE DOING AN ACTION
         */
    },
    unlock: function(type, slug) {
        if (this.isAnimating) {
            this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                //console.log("Type: " + type + ". Slug: " + slug);
                this.unlock(type, slug);
            }, this, type, slug);
        } else {
            if (!this.isUnlocked(slug)) {
                this.isAnimating = true;
                Chuck.gameData.achievementsTotal += 1;
                Chuck.gameData.achievementArray[slug].status = 1;
                
                switch(type) {
                    case "wood":
                        this.achievementIcon.loadTexture("achievements-icon-wood");
                        break;
                    case "clicks":
                        this.achievementIcon.loadTexture("achievements-icon-clicks");
                        break;
                    case "fruit":
                        this.achievementIcon.loadTexture("achievements-icon-fruit");
                        break;
                    case "acorn":
                        this.achievementIcon.loadTexture("achievements-icon-acorn");
                        break;
                    case "nest":
                        this.achievementIcon.loadTexture("achievements-icon-nest");
                        break;
                }
                
                this.achievementMessage.text = Chuck.gameData.achievementArray[slug].msg;
                this.achievementSubMessage.text = "Unlocked " + Chuck.gameData.achievementsTotal + " of 50";
                
                this.updateAchievements();
                
                this.game.add.tween(this.achievementGroup).to({y : (this.game.scale.bounds.height*2) - 232}, 100, Phaser.Easing.Quadratic.InOut, true, 25, false);
                this.achievementSound.play();
                this.game.time.events.add(Phaser.Timer.SECOND * 3, function() {
                    this.game.add.tween(this.achievementGroup).to({y : (this.game.scale.bounds.height*2) - 100}, 100, Phaser.Easing.Quadratic.InOut, true, 25, false);
                    this.isAnimating = false;
                }, this);
                
            } else {
                //console.log("You have already unlocked that achievement");
            }
        }
    },
    checkAchievements: function(type) {
        switch (type) {
            case "wood":
                Chuck.ShopActor.shopAchievementWoodProgressNumberTxt.text = 'Total:  ' + Chuck.gameData.woodTotal;
                if (Chuck.gameData.woodTotal >= 1000000 && Chuck.gameData.achievementArray["wood-level-10"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 10;
                    this.unlock("wood", "wood-level-10");
                    break;
                } else if (Chuck.gameData.woodTotal >= 500000 && Chuck.gameData.achievementArray["wood-level-9"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 9;
                    this.unlock("wood", "wood-level-9");
                    break;
                } else if (Chuck.gameData.woodTotal >= 250000 && Chuck.gameData.achievementArray["wood-level-8"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 8;
                    this.unlock("wood", "wood-level-8");
                    break;
                } else if (Chuck.gameData.woodTotal >= 100000 && Chuck.gameData.achievementArray["wood-level-7"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 7;
                    this.unlock("wood", "wood-level-7");
                    break;
                } else if (Chuck.gameData.woodTotal >= 50000 && Chuck.gameData.achievementArray["wood-level-6"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 6;
                    this.unlock("wood", "wood-level-6");
                    break;
                } else if (Chuck.gameData.woodTotal >= 15000 && Chuck.gameData.achievementArray["wood-level-5"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 5;
                    this.unlock("wood", "wood-level-5");
                    break;
                } else if (Chuck.gameData.woodTotal >= 5000 && Chuck.gameData.achievementArray["wood-level-4"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 4;
                    this.unlock("wood", "wood-level-4");
                    break;
                } else if (Chuck.gameData.woodTotal >= 1250 && Chuck.gameData.achievementArray["wood-level-3"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 3;
                    this.unlock("wood", "wood-level-3");
                    break;
                } else if (Chuck.gameData.woodTotal >= 500 && Chuck.gameData.achievementArray["wood-level-2"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 2;
                    this.unlock("wood", "wood-level-2");
                    break;
                } else if (Chuck.gameData.woodTotal >= 100 && Chuck.gameData.achievementArray["wood-level-1"].status == 0) {
                    Chuck.gameData.achievementWoodLevel = 1;
                    this.unlock("wood", "wood-level-1");
                    break;
                }
                break;
            case "clicks":
                Chuck.ShopActor.shopAchievementClicksProgressNumberTxt.text = 'Total:  ' + Chuck.gameData.clicksTotal;
                if (Chuck.gameData.clicksTotal >= 50000 && Chuck.gameData.achievementArray["clicks-level-10"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 10;
                    this.unlock("clicks", "clicks-level-10");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 20000 && Chuck.gameData.achievementArray["clicks-level-9"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 9;
                    this.unlock("clicks", "clicks-level-9");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 10000 && Chuck.gameData.achievementArray["clicks-level-8"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 8;
                    this.unlock("clicks", "clicks-level-8");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 5000 && Chuck.gameData.achievementArray["clicks-level-7"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 7;
                    this.unlock("clicks", "clicks-level-7");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 2500 && Chuck.gameData.achievementArray["clicks-level-6"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 6;
                    this.unlock("clicks", "clicks-level-6");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 1000 && Chuck.gameData.achievementArray["clicks-level-5"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 5;
                    this.unlock("clicks", "clicks-level-5");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 500 && Chuck.gameData.achievementArray["clicks-level-4"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 4;
                    this.unlock("clicks", "clicks-level-4");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 250 && Chuck.gameData.achievementArray["clicks-level-3"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 3;
                    this.unlock("clicks", "clicks-level-3");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 100 && Chuck.gameData.achievementArray["clicks-level-2"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 2;
                    this.unlock("clicks", "clicks-level-2");
                    break;
                } else if (Chuck.gameData.clicksTotal >= 50 && Chuck.gameData.achievementArray["clicks-level-1"].status == 0) {
                    Chuck.gameData.achievementClicksLevel = 1;
                    this.unlock("clicks", "clicks-level-1");
                    break;
                }
                break;
            case "fruit":
                Chuck.ShopActor.shopAchievementFruitProgressNumberTxt.text = 'Total:  ' + Chuck.gameData.fruitTotal;
                if (Chuck.gameData.fruitTotal >= 1000 && Chuck.gameData.achievementArray["fruit-level-10"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 10;
                    this.unlock("fruit", "fruit-level-10");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 500 && Chuck.gameData.achievementArray["fruit-level-9"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 9;
                    this.unlock("fruit", "fruit-level-9");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 250 && Chuck.gameData.achievementArray["fruit-level-8"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 8;
                    this.unlock("fruit", "fruit-level-8");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 100 && Chuck.gameData.achievementArray["fruit-level-7"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 7;
                    this.unlock("fruit", "fruit-level-7");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 50 && Chuck.gameData.achievementArray["fruit-level-6"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 6;
                    this.unlock("fruit", "fruit-level-6");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 25 && Chuck.gameData.achievementArray["fruit-level-5"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 5;
                    this.unlock("fruit", "fruit-level-5");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 15 && Chuck.gameData.achievementArray["fruit-level-4"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 4;
                    this.unlock("fruit", "fruit-level-4");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 7 && Chuck.gameData.achievementArray["fruit-level-3"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 3;
                    this.unlock("fruit", "fruit-level-3");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 3 && Chuck.gameData.achievementArray["fruit-level-2"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 2;
                    this.unlock("fruit", "fruit-level-2");
                    break;
                } else if (Chuck.gameData.fruitTotal >= 1 && Chuck.gameData.achievementArray["fruit-level-1"].status == 0) {
                    Chuck.gameData.achievementFruitLevel = 1;
                    this.unlock("fruit", "fruit-level-1");
                    break;
                }
                break;
            case "acorn":
                Chuck.ShopActor.shopAchievementAcornProgressNumberTxt.text = 'Total:  ' + Chuck.gameData.acornTotal;
                if (Chuck.gameData.acornTotal >= 10 && Chuck.gameData.achievementArray["acorn-level-10"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 10;
                    this.unlock("acorn", "acorn-level-10");
                    break;
                } else if (Chuck.gameData.acornTotal >= 9 && Chuck.gameData.achievementArray["acorn-level-9"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 9;
                    this.unlock("acorn", "acorn-level-9");
                    break;
                } else if (Chuck.gameData.acornTotal >= 8 && Chuck.gameData.achievementArray["acorn-level-8"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 8;
                    this.unlock("acorn", "acorn-level-8");
                    break;
                } else if (Chuck.gameData.acornTotal >= 7 && Chuck.gameData.achievementArray["acorn-level-7"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 7;
                    this.unlock("acorn", "acorn-level-7");
                    break;
                } else if (Chuck.gameData.acornTotal >= 6 && Chuck.gameData.achievementArray["acorn-level-6"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 6;
                    this.unlock("acorn", "acorn-level-6");
                    break;
                } else if (Chuck.gameData.acornTotal >= 5 && Chuck.gameData.achievementArray["acorn-level-5"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 5;
                    this.unlock("acorn", "acorn-level-5");
                    break;
                } else if (Chuck.gameData.acornTotal >= 4 && Chuck.gameData.achievementArray["acorn-level-4"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 4;
                    this.unlock("acorn", "acorn-level-4");
                    break;
                } else if (Chuck.gameData.acornTotal >= 3 && Chuck.gameData.achievementArray["acorn-level-3"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 3;
                    this.unlock("acorn", "acorn-level-3");
                    break;
                } else if (Chuck.gameData.acornTotal >= 2 && Chuck.gameData.achievementArray["acorn-level-2"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 2;
                    this.unlock("acorn", "acorn-level-2");
                    break;
                } else if (Chuck.gameData.acornTotal >= 1 && Chuck.gameData.achievementArray["acorn-level-1"].status == 0) {
                    Chuck.gameData.achievementAcornLevel = 1;
                    this.unlock("acorn", "acorn-level-1");
                    break;
                }
                break;
            case "nest":
                Chuck.ShopActor.shopAchievementNestProgressNumberTxt.text = 'Total:  ' + Chuck.gameData.nestTotal;
                if (Chuck.gameData.nestTotal >= 10 && Chuck.gameData.achievementArray["nest-level-10"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 10;
                    this.unlock("nest", "nest-level-10");
                    break;
                } else if (Chuck.gameData.nestTotal >= 9 && Chuck.gameData.achievementArray["nest-level-9"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 9;
                    this.unlock("nest", "nest-level-9");
                    break;
                } else if (Chuck.gameData.nestTotal >= 8 && Chuck.gameData.achievementArray["nest-level-8"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 8;
                    this.unlock("nest", "nest-level-8");
                    break;
                } else if (Chuck.gameData.nestTotal >= 7 && Chuck.gameData.achievementArray["nest-level-7"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 7;
                    this.unlock("nest", "nest-level-7");
                    break;
                } else if (Chuck.gameData.nestTotal >= 6 && Chuck.gameData.achievementArray["nest-level-6"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 6;
                    this.unlock("nest", "nest-level-6");
                    break;
                } else if (Chuck.gameData.nestTotal >= 5 && Chuck.gameData.achievementArray["nest-level-5"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 5;
                    this.unlock("nest", "nest-level-5");
                    break;
                } else if (Chuck.gameData.nestTotal >= 4 && Chuck.gameData.achievementArray["nest-level-4"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 4;
                    this.unlock("nest", "nest-level-4");
                    break;
                } else if (Chuck.gameData.nestTotal >= 3 && Chuck.gameData.achievementArray["nest-level-3"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 3;
                    this.unlock("nest", "nest-level-3");
                    break;
                } else if (Chuck.gameData.nestTotal >= 2 && Chuck.gameData.achievementArray["nest-level-2"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 2;
                    this.unlock("nest", "nest-level-2");
                    break;
                } else if (Chuck.gameData.nestTotal >= 1 && Chuck.gameData.achievementArray["nest-level-1"].status == 0) {
                    Chuck.gameData.achievementNestLevel = 1;
                    this.unlock("nest", "nest-level-1");
                    break;
                }
                break;
        }
    },
    updateAchievements: function() {
        Chuck.ShopActor.shopAchievementWoodProgress.frame = Chuck.gameData.achievementWoodLevel;
        Chuck.ShopActor.shopAchievementClicksProgress.frame = Chuck.gameData.achievementClicksLevel;
        Chuck.ShopActor.shopAchievementFruitProgress.frame = Chuck.gameData.achievementFruitLevel;
        Chuck.ShopActor.shopAchievementAcornProgress.frame = Chuck.gameData.achievementAcornLevel;
        Chuck.ShopActor.shopAchievementNestProgress.frame = Chuck.gameData.achievementNestLevel;
    },
    /**
     * UTILITY FUNCTIONS
     */
    isUnlocked: function(slug) {
        if (Chuck.gameData.achievementArray[slug].status == 0) {
            return false;
        } else {
            return true;
        }
    }
}