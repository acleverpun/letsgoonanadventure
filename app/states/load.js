import State from './state';


class Load extends State {

	init(spawnLocation) {
		this.spawnLocation = spawnLocation;
		this.mapId = this.spawnLocation.mapId || 'error';
	}


	preload() {
		// maps
		this.load.tilemap(this.mapId, `assets/maps/${this.mapId}.json`, null, Phaser.Tilemap.TILED_JSON);

		// images
		// TODO: get these dynamically from the map data
		this.load.image('pokemon-1', 'assets/tilesheets/pokemon-1.png');
		this.load.image('pokemon-2', 'assets/tilesheets/pokemon-2.png');
		this.load.image('pokemon-interior-1', 'assets/tilesheets/pokemon-interior-1.png');
	}


	create() {
		// start
		this.state.start('game', true, false, this.spawnLocation);
	}

}


export default Load;

