import State from './state';
import tiles from '../entities/tiles';


var mapEdges = {
};


class Game extends State {

	init(playerSpawn) {
		this.mapId = playerSpawn.map || 'error';
		this.playerSpawn = playerSpawn;

		// TODO: the up and coming `Point` class will do this
		if (_.isString(this.playerSpawn.x)) {}
		if (!this.playerSpawn.tileX && this.playerSpawn.x) this.playerSpawn.tileX = ~~(this.playerSpawn.x / 16);
		if (!this.playerSpawn.tileY && this.playerSpawn.y) this.playerSpawn.tileY = ~~(this.playerSpawn.y / 16);
		if (!this.playerSpawn.x && this.playerSpawn.tileX) this.playerSpawn.x = this.playerSpawn.tileX * 16;
		if (!this.playerSpawn.y && this.playerSpawn.tileY) this.playerSpawn.x = this.playerSpawn.tileY * 16;
	}


	preload() {
		// maps
		this.load.tilemap(this.mapId, `assets/maps/${this.mapId}.json`, null, Phaser.Tilemap.TILED_JSON);

		// images
		this.load.image('pokemon-1', 'assets/tilesheets/pokemon-1.png');
		this.load.image('pokemon-2', 'assets/tilesheets/pokemon-2.png');
	}


	create() {
		// MAP

		this.map = this.add.tilemap(this.mapId);
		this.map.addTilesetImage('pokemon-1', 'pokemon-1');
		this.map.addTilesetImage('pokemon-2', 'pokemon-2');

		// background
		this.stage.backgroundColor = this.cache.getTilemapData(this.mapId).data.backgroundcolor;

		// layers
		// TODO: this should be done dynamically as a loading step, finding each (non-object) layer
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
		// TODO: this should be done dynamically as a loading step, finding each used index
		this.map.setCollisionBetween(1, 6000, true, 'walls');
		this.map.setCollisionBetween(1, 6000, true, 'trees');
		this.map.setCollisionBetween(1, 6000, true, 'buildings');


		// PLAYER
		// TODO: breakout.exe into it's own thing

		// spawn player
		let spawnLayer = _.find(this.game.cache.getTilemapData(this.mapId).data.layers, { name: 'spawns' });
		let mapSpawnLocation = _.find(spawnLayer.objects, { name: 'player' });

		if (!this.playerSpawn.x) this.playerSpawn.x = mapSpawnLocation.x;
		if (!this.playerSpawn.y) this.playerSpawn.y = mapSpawnLocation.y;

		this.player = this.add.sprite(this.playerSpawn.x, this.playerSpawn.y, 'player');
		this.physics.arcade.enable(this.player);
		// TODO: get from a config setting, probably
		this.player.body.setSize(16, 16);
		this.player.body.collideWorldBounds = true;

		// camera
		this.camera.follow(this.player);

		// movement
		this.cursors = this.input.keyboard.createCursorKeys();


		// TILES

		this.tiles = {};

		let tileObjects = _.find(this.game.cache.getTilemapData(this.mapId).data.layers, { name: 'tiles' }).objects;
		tileObjects.forEach((data) => {
			// create tile instances
			let tile = new tiles[data.type](data);

			// store the tile for easy reference
			this.tiles[tile.locationString] = tile;
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

		let playerLocation = {
			tileX: ~~(this.player.x / 16),
			tileY: ~~(this.player.y / 16)
		};
		let playerLocationString = `${playerLocation.tileX},${playerLocation.tileY}`;

		// collision
		this.physics.arcade.collide(this.player, this.layers.walls);
		this.physics.arcade.collide(this.player, this.layers.trees);
		this.physics.arcade.collide(this.player, this.layers.buildings);

		// entities
		let tile = this.tiles[playerLocationString];
		if (tile) {
			tile.emit('enter', this.player);
		}
	}

}


export default Game;
