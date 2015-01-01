import State from './state';
import tiles from '../entities/tiles';
import { Point } from '../util/geo';


class Game extends State {

	init(spawnLocation) {
		this.spawnPoint = new Point(spawnLocation);

		this.mapId = this.spawnPoint.mapId || 'error';
		this.map = this.cache.getTilemapData(this.mapId).data;

		this.layers = {};
		this.tilemap = null;
	}


	preload() {
		// images
		this.map.tilesets.forEach((tileset) => {
			this.load.image(tileset.name, tileset.image.replace(/^\.\.\//, 'assets/'));
		});
	}


	create() {
		// MAP

		this.tilemap = this.add.tilemap(this.mapId);

		this.map.tilesets.forEach((tileset) => {
			this.tilemap.addTilesetImage(tileset.name, tileset.name);
		});

		// background
		if (this.map.backgroundcolor) {
			this.stage.backgroundColor = this.map.backgroundcolor;
		}

		// layers
		this.map.layers.forEach((layer) => {
			if (layer.type === 'tilelayer') {
				this.tilemap.addTilesetImage(layer.name, layer.name);
				this.layers[layer.name] = this.tilemap.createLayer(layer.name);

				// collision
				if (_.deepGet(layer, 'properties.collision') === 'true') {
					this.tilemap.setCollisionByExclusion([], true, layer.name);
				}
			}
		});

		// viewport
		this.layers.ground.resizeWorld();


		// PLAYER
		// TODO: breakout.exe into the player class

		// spawn player
		if (!_.isNumber(this.spawnPoint.x) || !_.isNumber(this.spawnPoint.y)) {
			let spawnLayer = _.find(this.map.layers, { name: 'spawns' });
			let mapSpawnLocation = _.find(spawnLayer.objects, { name: 'player' });

			// use map spawn if none specified
			if (!_.isNumber(this.spawnPoint.x)) this.spawnPoint.x = mapSpawnLocation.x;
			if (!_.isNumber(this.spawnPoint.y)) this.spawnPoint.y = mapSpawnLocation.y;
		}

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
			this.tiles[tile.coordinateString] = tile;
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

		// TODO: this doesn't need to make a new instance. Point should have convenience methods
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
