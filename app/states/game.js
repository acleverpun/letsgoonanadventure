import State from './state';
import tiles from '../entities/tiles';
import { Point } from '../util/geo';


class Game extends State {

	init(spawnPoint) {
		this.spawnPoint = spawnPoint;

		this.mapId = this.spawnPoint.map || 'error';
		this.map = this.cache.getTilemapData(this.mapId).data;
	}


	create() {
		// MAP

		this.tilemap = this.add.tilemap(this.mapId);

		// TODO: get these dynamically from the map data
		this.tilemap.addTilesetImage('pokemon-1', 'pokemon-1');
		this.tilemap.addTilesetImage('pokemon-2', 'pokemon-2');

		// background
		this.stage.backgroundColor = this.map.backgroundcolor;

		// layers
		// TODO: get these dynamically from the map data, finding each (non-object) layer
		this.layers = {
			ground: this.tilemap.createLayer('ground'),
			paths: this.tilemap.createLayer('paths'),
			walls: this.tilemap.createLayer('walls'),
			trees: this.tilemap.createLayer('trees'),
			buildings: this.tilemap.createLayer('buildings'),
		};

		// viewport
		this.layers.ground.resizeWorld();

		// collision
		// TODO: get these dynamically from the map data, finding each used index
		this.tilemap.setCollisionBetween(1, 6000, true, 'walls');
		this.tilemap.setCollisionBetween(1, 6000, true, 'trees');
		this.tilemap.setCollisionBetween(1, 6000, true, 'buildings');


		// PLAYER
		// TODO: breakout.exe into it's own thing

		// spawn player
		let spawnLayer = _.find(this.map.layers, { name: 'spawns' });
		let mapSpawnLocation = _.find(spawnLayer.objects, { name: 'player' });

		if (!this.spawnPoint.x) this.spawnPoint.x = mapSpawnLocation.x;
		if (!this.spawnPoint.y) this.spawnPoint.y = mapSpawnLocation.y;

		this.player = this.add.sprite(this.spawnPoint.x, this.spawnPoint.y, 'player');
		this.physics.arcade.enable(this.player);
		// TODO: get from a config setting, probably (not the map data, which may be diff)
		this.player.body.setSize(16, 16);
		// this.player.body.collideWorldBounds = true;

		// camera
		this.camera.follow(this.player);

		// movement
		this.cursors = this.input.keyboard.createCursorKeys();


		// TILES

		this.tiles = {};

		let tileObjects = _.find(this.map.layers, { name: 'tiles' }).objects;
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

		let playerLocation = new Point(this.player);
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
