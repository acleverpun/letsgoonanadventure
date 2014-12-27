import Tile from './tile';


class WarpTile extends Tile {

	constructor(data, ...props) {
		super(data, WarpTile.defaults, ...props);

		// warp target
		this.target = {
			map: data.properties.map,
			x: +data.properties.x,
			y: +data.properties.y
		};
	}


	// TODO: break out geolocation into its own class
	get geo() {
		return {
			x: this.x,
			y: this.y,
			map: this.map
		};
	}


	get geoString() {
		let geo = this.geo;
		return `${geo.x},${geo.y}`;
	}

}


WarpTile.defaults = {
	events: {
		enter: function(entity) {
			// load the game state, with the new map
			game.state.start('game', true, false, this.target.map);
		}
	}
};


export default WarpTile;
