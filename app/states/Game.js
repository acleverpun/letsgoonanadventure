class Game {

	preload() {
		// maps
		this.load.tilemap('main', 'assets/maps/main.json', null, Phaser.Tilemap.TILED_JSON);

		// images
		this.load.image('pokemon-1', 'assets/tilesheets/pokemon-1.png');
		this.load.image('pokemon-2', 'assets/tilesheets/pokemon-2.png');
	}


	create() {
		this.map = this.add.tilemap('main');
		this.map.addTilesetImage('pokemon-1', 'pokemon-1');
		this.map.addTilesetImage('pokemon-2', 'pokemon-2');
		this.stage.backgroundColor = this.cache.getTilemapData('main').data.backgroundcolor;

		this.layers = {
			ground: this.map.createLayer('ground'),
			paths: this.map.createLayer('paths'),
			walls: this.map.createLayer('walls'),
			trees: this.map.createLayer('trees'),
			buildings: this.map.createLayer('buildings'),
		};



		// PLAYER
		// TODO: breakout.exe into it's own thing

		// spawn player
		let spawnLayer = _.find(game.cache.getTilemapData('main').data.layers, { name: 'spawns' });
		let playerSpawn = _.find(spawnLayer.objects, { name: 'player' });

		this.player = this.add.sprite(playerSpawn.x, playerSpawn.y, 'player');
		this.physics.arcade.enable(this.player);

		// camera
		this.camera.follow(this.player);

		// movement
		this.cursors = this.input.keyboard.createCursorKeys();
	}


	update() {
		// player movement
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;

		if (this.cursors.up.isDown) {
			this.player.body.velocity.y -= 100;
		} else if (this.cursors.down.isDown) {
			this.player.body.velocity.y += 100;
		}

		if (this.cursors.left.isDown) {
			this.player.body.velocity.x -= 100;
		} else if (this.cursors.right.isDown) {
			this.player.body.velocity.x += 100;
		}
	}

}


export default Game;
