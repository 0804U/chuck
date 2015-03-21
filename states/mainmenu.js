Chuck.MainMenu = function (game) {

};

Chuck.MainMenu.prototype = {
	create: function () {
        /**
         * REQUEST THE ASSETS LOADED IN THE BOOT SEQUENCE
         */
        this.background = this.add.sprite(0, 0, 'menu-background');
		this.logo = this.add.sprite(13, 190, 'menu-logo');
		this.fyretale = this.add.sprite(0, (this.game.scale.bounds.height * 2) - 100, 'fyretale-logo');
        this.buttonPlay = this.add.button(240, 480, 'button-play', this.startGame, this);
        this.buttonPlay.inputEnabled = true;
        this.buttonPlay.input.useHandCursor = true;
	},

	update: function () {
		
	},

	startGame: function (pointer) {
        this.background.kill();
		this.state.start('Play');
	}
};