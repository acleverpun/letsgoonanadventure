import Tile from './tile';


class WarpTile extends Tile {

	constructor(data, ...props) {
		super(data, WarpTile.defaults, ...props);

		// warp target
		// TODO: use up and coming `Point` class
		this.target = {
			map: data.properties.map,
			x: data.properties.x,
			y: data.properties.y,
			tileX: data.properties.tileX,
			tileY: data.properties.tileY
		};

		if (_.isUndefined(this.target.x) && _.isUndefined(this.target.tileX)) {
			this.target.x = this.location.x;
			this.target.tileX = this.location.tileX;
		}
		if (_.isUndefined(this.target.y) && _.isUndefined(this.target.tileY)) {
			this.target.y = this.location.y;
			this.target.tileY = this.location.tileY;
		}
	}


}


WarpTile.defaults = {
	events: {
		enter: function(entity) {
			// load the game state, with the new map
			game.state.start('load', true, false, this.target);
		}
	}
};


export default WarpTile;
