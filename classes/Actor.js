ChubsGame.PlayerActor = null;
ChubsGame.EnemyActor = null;

ChubsGame.Actor = Class.extend({
    /**
     * CORE ATTRIBUTES
     */
	group: null,
    game: null,
    time: null,
    x: 0,
    y: 0,
    
    /**
     * ACTOR ATTRIBUTES
     */
	actorAttributes: null,
    shootRate: 0,
	shootDelay: 200,
    
    /**
     * ACTOR PARTS
     */
    avatar: null,
    head: null,
	torso: null,
	frontFoot: null,
	backFoot: null,
	weapon: null,
    gunSmoke: null,
    
    /**
     * ACTOR COLLISION POLYGONS
     */
	headRect: null,
	collidePoint: null,
	
	bullets: null,
	runSprite: null,
	trailEmitter: null,
	healthTextHolder: null,
    
	init:function(x, y, group, game, time){
        this.group = group;
		this.time = time;
		this.game = game;
        this.x = x;
        this.y = y;
        
        /**
         * INSERT ACTOR PARTS
         */
        this.avatar = this.game.add.group();
        
        this.head = group.create(this.x, this.y, 'playerHead');
		this.head.anchor.setTo(0.5, 0);
        this.avatar.addChild(this.head);
        
        this.torso = group.create(this.x, this.y, 'playerBody');
		this.torso.anchor.setTo(0.5, 0);
        this.avatar.addChild(this.torso);
        
        this.backFoot = group.create(this.x, this.y, 'playerFootBack');
		this.backFoot.anchor.setTo(0.5, 0);
        this.avatar.addChild(this.backFoot);
        
        this.frontFoot = group.create(this.x, this.y, 'playerFootFront');
		this.frontFoot.anchor.setTo(0.5, 0);
        this.avatar.addChild(this.frontFoot);
        
        this.weapon = game.add.sprite(this.torso.x, this.torso.y + (this.torso.height/2), 'weaponShotgun');
        this.weapon.anchor.setTo(0.25, 0.5);
        
        this.weapon.addChild(game.add.sprite(this.weapon.x + 85, this.weapon.y - 85, 'weaponBullet'));
        
        this.avatar.addChild(this.weapon);
        
		this.weapon.y = this.torso.height/2;
        
        
        
        /**
         * ENABLE PHYSICS
         */
        //this.game.physics.enable(this.group, Phaser.Physics.ARCADE);
        
        /**
         * SET ACTOR PHYSICS ATTRIBUTES
         
        this.group.setAll("body.bounce.y", 0);
        this.group.setAll("body.gravity.y", 200);
        this.group.setAll("body.mass", 50);
        this.group.setAll("body.collideWorldBounds", true);
        this.group.setAll("body.allowCollision.up", false);
        this.group.setAll("body.allowCollision.left", false);
        this.group.setAll("body.allowCollision.right", false);
        this.group.setProperty(this.frontFoot, "body.allowCollision.down", true);
        */
        /**
         * INSERT ACTOR WEAPON
         */
        //this.weapon = game.add.sprite(this.torso.x, this.torso.y + (this.torso.height/2), 'weaponShotgun');
        //this.weapon.anchor.setTo(0.25, 0.5);
        
        //this.weapon.addChild(game.add.sprite(this.weapon.x + 85, this.weapon.y - 85, 'weaponBullet'));
        //this.weapon.getChildAt(0).scale.setTo(0.0, 0.0);
        
        /**
         * BULLET POOL
         
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(20, 'weaponBullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('outOfBoundsKill', true);
*/
	},
    
    initPhysics:function(){
		this.game.physics.enable(this.avatar, Phaser.Physics.ARCADE);

		//Don't move the other parts
		/* for(var i =0; i < this.avatar.children.length; i++) {
			var part = this.torso.getChildAt(i).body;
			part.immovable = true;
			part.moves = false;
		} */
	},
    
    update: function() {
        this.move();
		this.weapon.x = this.torso.x;
        this.weapon.y = this.torso.y + (this.torso.height/2);   
    }
});

ChubsGame.Player = ChubsGame.Actor.extend({
    init: function(x, y, group, game, time) {
        this._super(x, y, group, game, time);
	},
    
    move: function() {
        this.group.setAll("body.velocity.x", 0);
	},

	update: function() {
		this._super();
	},
    
    /* shoot: function() {
		if (this.time.now > this.shootRate && this.bullets.countDead() > 0) {
            this.shootRate = this.time.now + this.shootDelay;

            var bullet = this.bullets.getFirstDead();
            
            var nozzle_point = this.weapon.getChildAt(0);

            this.weapon.y -= 4 * this.weapon.scale.y;
            this.weapon.x -= 3 * this.weapon.scale.y;
            //this.weapon.getChildAt(1).animations.play('shoot', 16, false, true);

            bullet.reset(nozzle_point.x, nozzle_point.y);
            console.log(bullet);
            bullet.rotation = this.weapon.rotation;
            bullet.body.velocity = this.game.physics.arcade.velocityFromAngle( (180 / Math.PI) * this.weapon.rotation, 600, 
                                            new Phaser.Point(nozzle_point.x, nozzle_point.y));

            this.weapon.rotation -= 0.25 * this.weapon.scale.y;

            var restTween = this.game.add.tween(this.weapon);
            restTween.to({ rotation: (this.game.physics.arcade.angleToPointer(this.weapon))}, 150, Phaser.Easing.Linear.None);
            restTween.start();

            return true;
        }
        return false;
	}, */
});