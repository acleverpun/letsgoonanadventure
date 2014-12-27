import Entity from '../entity';


class Tile extends Entity {

	constructor(data, ...props) {
		super(Tile.defaults, ...props);

		// dimensions
		this.width = data.width;
		this.height = data.height;

		// geo
		// TODO: pass in map
		this.map = game.state.getCurrentState().map.key;
		this.x = ~~(data.x / data.width);
		this.y = ~~(data.y / data.height);
	}


	// TODO: break out geolocation into its own class
	get geo() {
		return {
			map: this.map,
			x: this.x,
			y: this.y
		};
	}


	get geoString() {
		let geo = this.geo;
		return `${geo.x},${geo.y}`;
	}

}


Tile.defaults = {};


export default Tile;
