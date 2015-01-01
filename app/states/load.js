import State from './state';


class Load extends State {

	init(spawnLocation) {
		this.spawnLocation = spawnLocation;
		this.mapId = this.spawnLocation.mapId || 'error';
	}


	preload() {
		// maps
		this.load.tilemap(this.mapId, `assets/maps/${this.mapId}.json`, null, Phaser.Tilemap.TILED_JSON);
	}


	create() {
		// start
		this.state.start('game', true, false, this.spawnLocation);
	}

}


export default Load;

