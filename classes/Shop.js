Chuck.ShopActor = null;

Chuck.Shop = function(game, group){
    this.game = game;
    this.group = group;
};

Chuck.Shop.prototype = {
    shopGroup : null,
    shopGroupUpgrades : null,
    shopGroupPowerups : null,
    shopBG : null,
    shopTabPowerup : null,
    
    shopTabUpgrades : null,
    shopGroupUpgrades : null,
    
    shopTabUpgradesPower : null,
    shopTabUpgradesPowerTxt : null,
    shopTabUpgradesPowerBar : null,
    allowUpgrade : false,
    openTab: 'upgrades',
    
    /**
     * CREATE THE SHOP
     */
    create: function() {
        /**
         * CREATE THE SHOP GROUPS
         */
        this.shopGroup = this.game.add.group();
        this.shopGroupUpgrades = this.game.add.group();
        this.shopGroupPowerups = this.game.add.group();
        this.shopGroupAchievements = this.game.add.group();
        
        /**
         * HIDE THE POWERUPS TAB BY DEFAULT
         */
        this.shopGroupPowerups.visible = false;
        this.shopGroupAchievements.visible = false;
        
        /**
         * ADD THE SHOP BACKGROUND AND TABS
         */
        this.shopOverlay = this.game.add.sprite(0, 0, 'overlay');
        this.shopBG = this.game.add.sprite(60, 90, 'shop-bg');
        this.shopTabPowerup = this.game.add.button(this.game.scale.width - 4, 50, 'shop-tab-powerup', this.toggleTab, this);
        this.shopTabPowerup.tab = "powerups";
        this.shopTabUpgrades = this.game.add.button(68, 50, 'shop-tab-upgrades', this.toggleTab, this);
        this.shopTabUpgrades.tab = "upgrades";

        /**
         * ENABLE INPUT ON THE SHOP TABS
         */
        this.shopTabPowerup.inputEnabled = this.shopTabPowerup.input.useHandCursor = this.shopTabUpgrades.inputEnabled = this.shopTabUpgrades.input.useHandCursor = false;
        
        /**
         * ADD CHILD GROUPS TO SHOP GROUP
         */
        this.shopGroup.addMultiple([
            this.shopOverlay,
            this.shopTabPowerup,
            this.shopBG,
            this.shopTabUpgrades,
            this.shopGroupPowerups,
            this.shopGroupUpgrades,
            this.shopGroupAchievements
        ]);
        
        this.game.world.setProperty(this.shopOverlay, "z", 100);
        this.game.world.setProperty(this.shopTabPowerup, "z", 200);
        this.game.world.setProperty(this.shopBG, "z", 300);
        this.game.world.setProperty(this.shopTabUpgrades, "z", 400);
        this.game.world.setProperty(this.shopGroupPowerups, "z", 500);
        this.game.world.setProperty(this.shopGroupUpgrades, "z", 600);
        this.game.world.setProperty(this.shopGroupAchievements, "z", 700);
        
        this.game.world.sort('z');
        
        /**
         * ADD EACH SKILL UPGRADE TAB
         */
        
            /**
             * AXE UPGRADE
             */
            this.shopTabUpgradesAxe = this.game.add.button(90, 130, 'shop-tab-upgrades-axe', this.upgradeSkill, this);
            this.shopTabUpgradesAxe.skillType = "axe";
            this.shopTabUpgradesAxeCount = this.game.add.bitmapText(145, 176, 'cfont', '' + Chuck.gameData.axe);
            this.shopTabUpgradesAxeBG = this.game.add.sprite(200, 130, 'shop-tab-price');
            this.shopTabUpgradesAxeTxt = this.game.add.bitmapText(214, 140, 'cfont', "AXE LVL " + (Chuck.gameData.axe + 1));
            this.shopTabUpgradesAxeDescription = this.game.add.bitmapText(214, 170, 'cfont', "ALL STATS +" + (Chuck.gameData.axe + 1));
            this.shopTabUpgradesAxeCurrency = this.game.add.sprite(390, 140, 'shop-tab-currency');
            this.shopTabUpgradesAxePrice = this.game.add.bitmapText(440, 140, 'cfont', this.getPrice("upgrade", "axe").toString());
        
            /**
             * POWER UPGRADE
             */
            this.shopTabUpgradesPower = this.game.add.button(90, 250, 'shop-tab-upgrades-muscle', this.upgradeSkill, this);
            this.shopTabUpgradesPower.skillType = "power";
            this.shopTabUpgradesPowerCount = this.game.add.bitmapText(145, 300, 'cfont', '' + Chuck.gameData.power);
            this.shopTabUpgradesPowerBG = this.game.add.sprite(200, 250, 'shop-tab-price');
            this.shopTabUpgradesPowerTxt = this.game.add.bitmapText(214, 260, 'cfont', "POWER LVL " + (Chuck.gameData.power + 1));
            this.shopTabUpgradesPowerDescription = this.game.add.bitmapText(214, 290, 'cfont', "CHOPPING POWER +" + (Chuck.gameData.power + 1));
            this.shopTabUpgradesPowerCurrency = this.game.add.sprite(390, 260, 'shop-tab-currency');
            this.shopTabUpgradesPowerPrice = this.game.add.bitmapText(440, 260, 'cfont', this.getPrice("upgrade", "power").toString());
        
            /**
             * SPEED UPGRADE
             */
            this.shopTabUpgradesSpeed = this.game.add.button(90, 370, 'shop-tab-upgrades-clocks', this.upgradeSkill, this);
            this.shopTabUpgradesSpeed.skillType = "speed";
            this.shopTabUpgradesSpeedCount = this.game.add.bitmapText(145, 420, 'cfont', '' + Chuck.gameData.speed);
            this.shopTabUpgradesSpeedBG = this.game.add.sprite(200, 370, 'shop-tab-price');
            this.shopTabUpgradesSpeedTxt = this.game.add.bitmapText(214, 380, 'cfont', "SPEED LVL " + (Chuck.gameData.speed + 1));
            this.shopTabUpgradesSpeedDescription = this.game.add.bitmapText(214, 410, 'cfont', "CHOPPING SPEED +" + (Chuck.gameData.speed + 1));
            this.shopTabUpgradesSpeedCurrency = this.game.add.sprite(390, 380, 'shop-tab-currency');
            this.shopTabUpgradesSpeedPrice = this.game.add.bitmapText(440, 380, 'cfont', this.getPrice("upgrade", "speed").toString());
        
            /**
             * LUCK UPGRADE
             */
            this.shopTabUpgradesLuck = this.game.add.button(90, 490, 'shop-tab-upgrades-clover', this.upgradeSkill, this);
            this.shopTabUpgradesLuck.skillType = "luck";
            this.shopTabUpgradesLuckCount = this.game.add.bitmapText(145, 540, 'cfont', '' + Chuck.gameData.luck);
            this.shopTabUpgradesLuckBar = this.game.add.sprite(200, 490, 'shop-tab-price');
            this.shopTabUpgradesLuckTxt = this.game.add.bitmapText(214, 500, 'cfont', "LUCK LVL " + (Chuck.gameData.luck + 1));
            this.shopTabUpgradesLuckDescription = this.game.add.bitmapText(214, 530, 'cfont', "CHOPPING LUCK +" + (Chuck.gameData.luck + 1));
            this.shopTabUpgradesLuckCurrency = this.game.add.sprite(390, 500, 'shop-tab-currency');
            this.shopTabUpgradesLuckPrice = this.game.add.bitmapText(440, 500, 'cfont', this.getPrice("upgrade", "luck").toString());

            /**
             * SET UPGRADE INPUT TO FALSE
             */
            this.shopTabUpgradesAxe.inputEnabled = this.shopTabUpgradesPower.inputEnabled = this.shopTabUpgradesSpeed.inputEnabled = this.shopTabUpgradesLuck.inputEnabled = false;
            this.shopTabUpgradesAxe.input.useHandCursor = this.shopTabUpgradesPower.input.useHandCursor = this.shopTabUpgradesSpeed.input.useHandCursor = this.shopTabUpgradesLuck.input.useHandCursor = true;
        
            /**
             * SET UPGRADE FONT COLOR TO WHITE
             */
            this.shopTabUpgradesAxeCount.fill = this.shopTabUpgradesAxePrice.fill = this.shopTabUpgradesAxeDescription.fill = this.shopTabUpgradesAxeTxt.fill = this.shopTabUpgradesPowerCount.fill = this.shopTabUpgradesPowerPrice.fill = this.shopTabUpgradesPowerDescription.fill = this.shopTabUpgradesPowerTxt.fill = this.shopTabUpgradesSpeedCount.fill = this.shopTabUpgradesSpeedPrice.fill = this.shopTabUpgradesSpeedDescription.fill = this.shopTabUpgradesSpeedTxt.fill = this.shopTabUpgradesLuckCount.fill = this.shopTabUpgradesLuckPrice.fill = this.shopTabUpgradesLuckDescription.fill = this.shopTabUpgradesLuckTxt.fill = '#FFFFFF';
        
            /**
             * SET UPGRADE LEVEL FONT SIZE
             */
            this.shopTabUpgradesAxeCount.fontSize = this.shopTabUpgradesPowerCount.fontSize = this.shopTabUpgradesSpeedCount.fontSize = this.shopTabUpgradesLuckCount.fontSize = 30;

            /**
             * SET TEXT FONT SIZE
             */
            this.shopTabUpgradesAxePrice.fontSize = this.shopTabUpgradesAxeDescription.fontSize = this.shopTabUpgradesAxeTxt.fontSize = this.shopTabUpgradesPowerPrice.fontSize = this.shopTabUpgradesPowerDescription.fontSize = this.shopTabUpgradesPowerTxt.fontSize = this.shopTabUpgradesSpeedPrice.fontSize = this.shopTabUpgradesSpeedDescription.fontSize = this.shopTabUpgradesSpeedTxt.fontSize = this.shopTabUpgradesLuckPrice.fontSize = this.shopTabUpgradesLuckDescription.fontSize = this.shopTabUpgradesLuckTxt.fontSize = 26;
        
            /**
             * ADD UPGRADES TO UPGRADE GROUP
             */
            this.shopGroupUpgrades.addMultiple([
                this.shopTabUpgradesAxe,
                this.shopTabUpgradesAxeCount,
                this.shopTabUpgradesAxeBG,
                this.shopTabUpgradesAxeCurrency,
                this.shopTabUpgradesAxeDescription,
                this.shopTabUpgradesAxeTxt,
                this.shopTabUpgradesAxePrice,
                this.shopTabUpgradesPower,
                this.shopTabUpgradesPowerCount,
                this.shopTabUpgradesPowerBG,
                this.shopTabUpgradesPowerCurrency,
                this.shopTabUpgradesPowerDescription,
                this.shopTabUpgradesPowerTxt,
                this.shopTabUpgradesPowerPrice,
                this.shopTabUpgradesSpeed,
                this.shopTabUpgradesSpeedCount,
                this.shopTabUpgradesSpeedBG,
                this.shopTabUpgradesSpeedCurrency,
                this.shopTabUpgradesSpeedDescription,
                this.shopTabUpgradesSpeedTxt,
                this.shopTabUpgradesSpeedPrice,
                this.shopTabUpgradesLuck,
                this.shopTabUpgradesLuckCount,
                this.shopTabUpgradesLuckBar,
                this.shopTabUpgradesLuckCurrency,
                this.shopTabUpgradesLuckDescription,
                this.shopTabUpgradesLuckTxt,
                this.shopTabUpgradesLuckPrice
            ]);
        
        /**
         * ADD EACH ACHIEVEMENT
         */
        
            /**
             * WOOD COLLECTED ACHIEVEMENT
             */
            this.shopAchievementWood = this.game.add.sprite(90, 130, 'shop-tab-achievement-wood');
            this.shopAchievementWoodProgress = this.game.add.sprite(200, 162, 'shop-tab-achievement');
            this.shopAchievementWoodProgress.frame = Chuck.gameData.achievementWoodLevel - 1;
            this.shopAchievementWoodProgressTxt = this.game.add.bitmapText(200, 127, 'cfont', 'TOTAL WOOD COLLECTED');
            this.shopAchievementWoodProgressNumberTxt = this.game.add.bitmapText(94, 219, 'cfont', 'Total:  ' + Chuck.gameData.woodTotal);
            this.shopAchievementWoodProgressTxt.fontSize = this.shopAchievementWoodProgressNumberTxt.fontSize = 28;
        
            this.shopAchievementClicks = this.game.add.sprite(90, 266, 'shop-tab-achievement-clicks');
            this.shopAchievementClicksProgress = this.game.add.sprite(200, 298, 'shop-tab-achievement');
            this.shopAchievementClicksProgress.frame = Chuck.gameData.achievementClicksLevel - 1;
            this.shopAchievementClicksProgressTxt = this.game.add.bitmapText(200, 263, 'cfont', 'TOTAL CLICKS PRESSED');
            this.shopAchievementClicksProgressNumberTxt = this.game.add.bitmapText(94, 355, 'cfont', 'Total:  ' + Chuck.gameData.clicksTotal);
            this.shopAchievementClicksProgressTxt.fontSize = this.shopAchievementClicksProgressNumberTxt.fontSize = 28;
        
            this.shopAchievementFruit = this.game.add.sprite(90, 402, 'shop-tab-achievement-fruit');
            this.shopAchievementFruitProgress = this.game.add.sprite(200, 434, 'shop-tab-achievement');
            this.shopAchievementFruitProgress.frame = Chuck.gameData.achievementFruitLevel - 1;
            this.shopAchievementFruitProgressTxt = this.game.add.bitmapText(200, 399, 'cfont', 'TOTAL FRUIT COLLECTED');
            this.shopAchievementFruitProgressNumberTxt = this.game.add.bitmapText(94, 491, 'cfont', 'Total:  ' + Chuck.gameData.fruitTotal);
            this.shopAchievementFruitProgressTxt.fontSize = this.shopAchievementFruitProgressNumberTxt.fontSize = 28;
        
            this.shopAchievementAcorn = this.game.add.sprite(90, 538, 'shop-tab-achievement-acorn');
            this.shopAchievementAcornProgress = this.game.add.sprite(200, 570, 'shop-tab-achievement');
            this.shopAchievementAcornProgress.frame = Chuck.gameData.achievementAcornLevel - 1;
            this.shopAchievementAcornProgressTxt = this.game.add.bitmapText(200, 535, 'cfont', 'TOTAL ACORNS COLLECTED');
            this.shopAchievementAcornProgressNumberTxt = this.game.add.bitmapText(94, 627, 'cfont', 'Total:  ' + Chuck.gameData.acornTotal);
            this.shopAchievementAcornProgressTxt.fontSize = this.shopAchievementAcornProgressNumberTxt.fontSize = 28;
            
            this.shopAchievementNest = this.game.add.sprite(90, 674, 'shop-tab-achievement-nest');
            this.shopAchievementNestProgress = this.game.add.sprite(200, 706, 'shop-tab-achievement');
            this.shopAchievementNestProgress.frame = Chuck.gameData.achievementNestLevel - 1;
            this.shopAchievementNestProgressTxt = this.game.add.bitmapText(200, 671, 'cfont', 'TOTAL NESTS COLLECTED');
            this.shopAchievementNestProgressNumberTxt = this.game.add.bitmapText(94, 763, 'cfont', 'Total:  ' + Chuck.gameData.nestTotal);
            this.shopAchievementNestProgressTxt.fontSize = this.shopAchievementNestProgressNumberTxt.fontSize = 28;
        
            this.shopGroupAchievements.addMultiple([
                this.shopAchievementWood,
                this.shopAchievementWoodProgress,
                this.shopAchievementWoodProgressTxt,
                this.shopAchievementWoodProgressNumberTxt,
                this.shopAchievementClicks,
                this.shopAchievementClicksProgress,
                this.shopAchievementClicksProgressTxt,
                this.shopAchievementClicksProgressNumberTxt,
                this.shopAchievementFruit,
                this.shopAchievementFruitProgress,
                this.shopAchievementFruitProgressTxt,
                this.shopAchievementFruitProgressNumberTxt,
                this.shopAchievementAcorn,
                this.shopAchievementAcornProgress,
                this.shopAchievementAcornProgressTxt,
                this.shopAchievementAcornProgressNumberTxt,
                this.shopAchievementNest,
                this.shopAchievementNestProgress,
                this.shopAchievementNestProgressTxt,
                this.shopAchievementNestProgressNumberTxt
            ]);

            /**
             * ADD UPGRADE GROUP TO SHOP GROUP
             */
            this.group.add(this.shopGroup);
    },
    upgradeSkill: function(skill) {
        var skillType = skill.skillType;
        /**
         * LOG THE REQUEST FOR A SKILL UPGRADE
         */
        //console.log("/*****************************/");
        //console.log("/** UPGRDING SKILL: " + skillType + " **/");
        //console.log("/** Current Wood: " + Chuck.gameData.woodCount + " **/");
        //console.log("/** Upgrade Cost: " + this.getPrice("upgrade", skillType) + " **/");
        //console.log("/*****************************/");
        
        /**
         * SET THE UPGRADE COST OF THIS SKILL
         */
        this.cost = this.getPrice("upgrade", skillType);
        
        if (this.cost === 0) {
            /**
             * MAXED OUT, DO NOTHING
             */
        } else {
            if (Chuck.gameData.woodCount >= this.cost) {
                this.allowUpgrade = true;
            } else {
                console.log("Not enough wood: " + Chuck.gameData.woodCount + ". You need: " + this.cost);
            }

            /**
             * WHICH SKILL ARE WE UPGRADING
             */
            if (this.allowUpgrade) {
                this.allowUpgrade = false;
                Chuck.gameData.woodCount -= this.cost;
                switch (skillType) {
                    case "axe":
                        /**
                         * SET THE NEW AXE LEVEL
                         */
                        Chuck.gameData.axe = Chuck.gameData.axe + 1;

                        /**
                         * SET THE PRICE FOR THE NEXT LEVEL
                         */
                        this.shopTabUpgradesAxePrice.text = this.getPrice("upgrade", "axe").toString();
                        break;
                    case "power":
                        /**
                         * SET THE NEW POWER LEVEL
                         */
                        Chuck.gameData.power = Chuck.gameData.power + 1;

                        /**
                         * SET THE PRICE FOR THE NEXT LEVEL
                         */
                        this.shopTabUpgradesPowerPrice.text = this.getPrice("upgrade", "power").toString();
                        break;
                    case "speed":
                        /**
                         * SET THE NEW SPEED LEVEL
                         */
                        Chuck.gameData.speed = Chuck.gameData.speed + 1;

                        /**
                         * SET THE PRICE FOR THE NEXT LEVEL
                         */
                        this.shopTabUpgradesSpeedPrice.text = this.getPrice("upgrade", "speed").toString();
                        break;
                    case "luck":
                        /**
                         * SET THE NEW LUCK LEVEL
                         */
                        Chuck.gameData.luck = Chuck.gameData.luck + 1;

                        /**
                         * SET THE PRICE FOR THE NEXT LEVEL
                         */
                        this.shopTabUpgradesLuckPrice.text = this.getPrice("upgrade", "luck").toString();
                        break;
                }
                this.updateLevels();
            }
        }
    },
    toggleTab: function(tab) {
        var openTab = tab.tab;
        
        if (openTab != this.openTab) {
            this.openTab = openTab;
            this.shopGroup.swap(this.shopTabPowerup, this.shopTabUpgrades);
            switch(openTab) {
                case "upgrades":
                    this.shopGroupUpgrades.visible = true;
                    this.shopGroupAchievements.visible = false;
                    break;
                case "powerups":
                    this.shopGroupUpgrades.visible = false;
                    this.shopGroupAchievements.visible = true;
                    break;
            }
        }
    },
    getPrice: function(priceType, skillType) {
        var levelModifier = 0;
        if (priceType == "upgrade") {
            levelModifier = 1;
        }
        switch (skillType) {
            case "axe":
                if (Chuck.gameData.axe < 10) {
                    return ((Chuck.gameData.axe+levelModifier) * 120) * (((Chuck.gameData.axe+levelModifier) * Chuck.gameData.axe)/2.5);
                } else {
                    return 0;
                }
                break;
            case "power":
                if (Chuck.gameData.power < 10) {
                    return ((Chuck.gameData.power+levelModifier) * 60) * (((Chuck.gameData.power+levelModifier) * Chuck.gameData.power)/3);
                } else {
                    return 0;
                }
                break;
            case "speed":
                if (Chuck.gameData.speed < 10) {
                    return ((Chuck.gameData.speed+levelModifier) * 60) * (((Chuck.gameData.speed+levelModifier) * Chuck.gameData.speed)/3);
                } else {
                    return 0;
                }
                break;
            case "luck":
                if (Chuck.gameData.luck < 10) {
                    return ((Chuck.gameData.luck+levelModifier) * 60) * (((Chuck.gameData.luck+levelModifier) * Chuck.gameData.luck)/3);
                } else {
                    return 0;
                }
                break;
        }
    },
    updateLevels: function() {
        Chuck.PlayerActor.updateWood();
        
        if (Chuck.gameData.axe < 10) {
            this.shopTabUpgradesAxeCount.text = Chuck.gameData.axe;
            this.shopTabUpgradesAxeTxt.text = "AXE LVL " + (Chuck.gameData.axe + 1);
            this.shopTabUpgradesAxeDescription.text = "ALL STATS +" + (Chuck.gameData.axe + 1);
        } else {
            this.shopTabUpgradesAxeCount.text = Chuck.gameData.axe;
            this.shopTabUpgradesAxeCount.x = 139;
            this.shopTabUpgradesAxeTxt.text = "YOUR AXE IS MAX LVL";
            this.shopTabUpgradesAxePrice.text = "";
            this.shopTabUpgradesAxeDescription.text = "ALL STATS +" + Chuck.gameData.axe;
            this.shopTabUpgradesAxeCurrency.kill();
        }
        
        if (Chuck.gameData.power < 10) {
            this.shopTabUpgradesPowerCount.text = Chuck.gameData.power;
            this.shopTabUpgradesPowerTxt.text = "POWER LVL " + (Chuck.gameData.power + 1);
            this.shopTabUpgradesPowerDescription.text = "CHOPPING POWER +" + (Chuck.gameData.power + 1);
        } else {
            this.shopTabUpgradesPowerCount.text = Chuck.gameData.power;
            this.shopTabUpgradesPowerCount.x = 139;
            this.shopTabUpgradesPowerTxt.text = "YOUR POWER IS MAX LVL";
            this.shopTabUpgradesPowerPrice.text = "";
            this.shopTabUpgradesPowerDescription.text = "CHOPPING POWER +" + Chuck.gameData.power;
            this.shopTabUpgradesPowerCurrency.kill();
        }
        
        if (Chuck.gameData.speed < 10) {
            this.shopTabUpgradesSpeedCount.text = Chuck.gameData.speed;
            this.shopTabUpgradesSpeedTxt.text = "SPEED LVL " + (Chuck.gameData.speed + 1);
            this.shopTabUpgradesSpeedDescription.text = "CHOPPING SPEED +" + (Chuck.gameData.speed + 1);
        } else {
            this.shopTabUpgradesSpeedCount.text = Chuck.gameData.speed;
            this.shopTabUpgradesSpeedCount.x = 139;
            this.shopTabUpgradesSpeedTxt.text = "YOUR SPEED IS MAX LVL";
            this.shopTabUpgradesSpeedPrice.text = "";
            this.shopTabUpgradesSpeedDescription.text = "CHOPPING SPEED +" + Chuck.gameData.speed;
            this.shopTabUpgradesSpeedCurrency.kill();
        }
        
        if (Chuck.gameData.luck < 10) {
            this.shopTabUpgradesLuckCount.text = Chuck.gameData.luck;
            this.shopTabUpgradesLuckTxt.text = "LUCK LVL " + (Chuck.gameData.luck + 1);
            this.shopTabUpgradesLuckDescription.text = "CHOPPING LUCK +" + (Chuck.gameData.luck + 1);
        } else {
            this.shopTabUpgradesLuckCount.text = Chuck.gameData.luck;
            this.shopTabUpgradesLuckCount.x = 139;
            this.shopTabUpgradesLuckTxt.text = "YOUR LUCK IS MAX LVL";
            this.shopTabUpgradesLuckPrice.text = "";
            this.shopTabUpgradesLuckDescription.text = "CHOPPING LUCK +" + Chuck.gameData.luck;
            this.shopTabUpgradesLuckCurrency.kill();
        }
    }
}