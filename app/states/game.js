import State from './state';
import tiles from '../entities/tiles';


class Game extends State {

	preload() {
		// maps
		this.load.tilemap('main', 'assets/maps/main.json', null, Phaser.Tilemap.TILED_JSON);

		// images
		this.load.image('pokemon-1', 'assets/tilesheets/pokemon-1.png');
		this.load.image('pokemon-2', 'assets/tilesheets/pokemon-2.png');
	}


	create() {
		// MAP

		this.map = this.add.tilemap('main');
		this.map.addTilesetImage('pokemon-1', 'pokemon-1');
		this.map.addTilesetImage('pokemon-2', 'pokemon-2');

		// background
		this.stage.backgroundColor = this.cache.getTilemapData('main').data.backgroundcolor;

		// layers
		this.layers = {
			ground: this.map.createLayer('ground'),
			paths: this.map.createLayer('paths'),
			walls: this.map.createLayer('walls'),
			trees: this.map.createLayer('trees'),
			buildings: this.map.createLayer('buildings'),
		};

		// viewport
		this.layers.ground.resizeWorld();

		// collision
		// TODO: this should be done programmatically as a loading step, finding each used index
		this.map.setCollisionBetween(1, 6000, true, 'walls');
		this.map.setCollisionBetween(1, 6000, true, 'trees');
		this.map.setCollisionBetween(1, 6000, true, 'buildings');


		// PLAYER
		// TODO: breakout.exe into it's own thing

		// spawn player
		let spawnLayer = _.find(this.game.cache.getTilemapData('main').data.layers, { name: 'spawns' });
		let playerSpawn = _.find(spawnLayer.objects, { name: 'player' });

		this.player = this.add.sprite(playerSpawn.x, playerSpawn.y, 'player');
		this.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;

		// camera
		this.camera.follow(this.player);

		// movement
		this.cursors = this.input.keyboard.createCursorKeys();


		// TILES

		this.tiles = {};

		let tileObjects = _.find(this.game.cache.getTilemapData('main').data.layers, { name: 'tiles' }).objects;
		tileObjects.forEach((data) => {
			// create tile instances
			let tile = new tiles[data.type](data);

			// store the tile for easy reference
			this.tiles[tile.geoString] = tile;
		});
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

		let playerGeo = {
			x: ~~(this.player.x / 16),
			y: ~~(this.player.y / 16)
		};
		let playerGeoString = `${playerGeo.x},${playerGeo.y}`;

		// collision
		this.physics.arcade.collide(this.player, this.layers.walls);
		this.physics.arcade.collide(this.player, this.layers.trees);
		this.physics.arcade.collide(this.player, this.layers.buildings);

		// entities
		let tile = this.tiles[playerGeoString];
		if (tile) {
			tile.emit('enter', this.player);
		}
	}

}


export default Game;
