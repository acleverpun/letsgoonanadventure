import State from './state';


class Load extends State {

	init(spawnPoint) {
		this.spawnPoint = spawnPoint;
		this.mapId = this.spawnPoint.map || 'error';
	}


	preload() {
		// maps
		this.load.tilemap(this.mapId, `assets/maps/${this.mapId}.json`, null, Phaser.Tilemap.TILED_JSON);

		// images
		// TODO: get these dynamically from the map data
		this.load.image('pokemon-1', 'assets/tilesheets/pokemon-1.png');
		this.load.image('pokemon-2', 'assets/tilesheets/pokemon-2.png');
	}


	create() {
		// start
		this.state.start('game', true, false, this.spawnPoint);
	}

}


export default Load;

