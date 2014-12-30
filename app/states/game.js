import State from './state';
import tiles from '../entities/tiles';


class Game extends State {

	getEdge(direction, inTiles) {
		let tileHeight = (inTiles) ? 1 : this.mapData.tileheight;
		let tileWidth = (inTiles) ? 1 : this.mapData.tilewidth;

		let edgeMap = {
			north: (map) => 0,
			south: (map) => map.height * tileHeight,
			east: (map) => map.width * tileWidth - tileWidth,
			west: (map) => 0
		};

		return edgeMap[direction](this.mapData);
	}


	init(spawnPoint) {
		this.spawnPoint = spawnPoint;

		this.mapId = this.spawnPoint.map || 'error';
		this.mapData = this.cache.getTilemapData(this.mapId).data;

		// TODO: the up and coming `Point` class will do most (if not all) of this
		if (_.isString(this.spawnPoint.x)) this.spawnPoint.x = this.getEdge(this.spawnPoint.x);
		if (_.isString(this.spawnPoint.y)) this.spawnPoint.y = this.getEdge(this.spawnPoint.y);
		if (!this.spawnPoint.tileX && this.spawnPoint.x) this.spawnPoint.tileX = ~~(this.spawnPoint.x / this.mapData.tilewidth);
		if (!this.spawnPoint.tileY && this.spawnPoint.y) this.spawnPoint.tileY = ~~(this.spawnPoint.y / this.mapData.tileheight);
		if (_.isString(this.spawnPoint.tileX)) this.spawnPoint.tileX = this.getEdge(this.spawnPoint.tileX, true);
		if (_.isString(this.spawnPoint.tileY)) this.spawnPoint.tileY = this.getEdge(this.spawnPoint.tileY, true);
		if (!this.spawnPoint.x && this.spawnPoint.tileX) this.spawnPoint.x = this.spawnPoint.tileX * this.mapData.tilewidth;
		if (!this.spawnPoint.y && this.spawnPoint.tileY) this.spawnPoint.x = this.spawnPoint.tileY * this.mapData.tileheight;
	}


	create() {
		// MAP

		this.map = this.add.tilemap(this.mapId);

		// TODO: get these dynamically from the map data
		this.map.addTilesetImage('pokemon-1', 'pokemon-1');
		this.map.addTilesetImage('pokemon-2', 'pokemon-2');

		// background
		this.stage.backgroundColor = this.mapData.backgroundcolor;

		// layers
		// TODO: get these dynamically from the map data, finding each (non-object) layer
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
		// TODO: get these dynamically from the map data, finding each used index
		this.map.setCollisionBetween(1, 6000, true, 'walls');
		this.map.setCollisionBetween(1, 6000, true, 'trees');
		this.map.setCollisionBetween(1, 6000, true, 'buildings');


		// PLAYER
		// TODO: breakout.exe into it's own thing

		// spawn player
		let spawnLayer = _.find(this.mapData.layers, { name: 'spawns' });
		let mapSpawnLocation = _.find(spawnLayer.objects, { name: 'player' });

		if (!this.spawnPoint.x) this.spawnPoint.x = mapSpawnLocation.x;
		if (!this.spawnPoint.y) this.spawnPoint.y = mapSpawnLocation.y;

		this.player = this.add.sprite(this.spawnPoint.x, this.spawnPoint.y, 'player');
		this.physics.arcade.enable(this.player);
		// TODO: get from a config setting, probably
		this.player.body.setSize(16, 16);
		// this.player.body.collideWorldBounds = true;

		// camera
		this.camera.follow(this.player);

		// movement
		this.cursors = this.input.keyboard.createCursorKeys();


		// TILES

		this.tiles = {};

		let tileObjects = _.find(this.mapData.layers, { name: 'tiles' }).objects;
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

		// TODO: let the up and coming `Point` class do the heavy lifting here
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
