class Game {

	init() {
		this.stage.backgroundColor = '#668899';
	}


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

		this.layers = {
			ground: this.map.createLayer('ground'),
			paths: this.map.createLayer('paths'),
			walls: this.map.createLayer('walls'),
			trees: this.map.createLayer('trees'),
			buildings: this.map.createLayer('buildings'),
		};
	}

}


export default Game;
