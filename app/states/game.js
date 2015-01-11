import State from './state';
import entities from '../entities';
import { Point } from '../util/geo';


class Game extends State {

	init(spawnLocation) {
		this.spawnPoint = new Point(spawnLocation);

		this.mapId = this.spawnPoint.mapId || 'error';
		this.map = this.cache.getTilemapData(this.mapId).data;

		this.layers = {};
		this.tilemap = null;
		this.player = null;

		// TODO: remove
		window.state = this;
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
		let mapLayers = this.map.layers.reduce((mapLayers, layer) => {
			mapLayers[layer.type].push(layer);
			return mapLayers;
		}, { tilelayer: [], objectgroup: [] });

		mapLayers.tilelayer.forEach((layerData) => {
			this.tilemap.addTilesetImage(layerData.name, layerData.name);

			let layer = this.tilemap.createLayer(layerData.name);
			layer.data = {};

			// collision
			// TODO: after #24, we should transpose everything in `properties.collision` to `layer.data`
			if (_.deepGet(layerData, 'properties.collision') === 'true') {
				this.tilemap.setCollisionByExclusion([], true, layerData.name);
				layer.data.isCollidable = true;
			} else {
				layer.data.isCollidable = false;
			}

			// store on the state
			this.layers[layerData.name] = layer;
		});

		// viewport
		this.layers.ground.resizeWorld();


		// PLAYER
		// TODO: breakout.exe into the player class

		// spawn player
		if (!_.isNumber(this.spawnPoint.x) || !_.isNumber(this.spawnPoint.y)) {
			let spawnLayer = _.find(mapLayers.objectgroup, { name: 'spawns' });
			let mapSpawnLocation = _.find(spawnLayer.objects, { name: 'player' });

			// use map spawn if none specified
			if (!_.isNumber(this.spawnPoint.x)) this.spawnPoint.x = mapSpawnLocation.x;
			if (!_.isNumber(this.spawnPoint.y)) this.spawnPoint.y = mapSpawnLocation.y;
		}

		this.player = this.spawn(entities.actors.Player, this.spawnPoint);


		// TILES

		// create each (known) entity in every object layer
		mapLayers.objectgroup.forEach((layer) => {
			layer.objects.forEach((data) => {
				let Entity = _.deepGet(entities, `${layer.name}.${data.type}`);

				// skip entity if it is not of a known type
				if (!Entity) return;

				// create entity instance
				this.spawn(Entity, data);
			});
		});
	}

}


export default Game;
