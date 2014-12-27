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
			console.log('enter', entity, this.target);
		}
	}
};


export default WarpTile;
