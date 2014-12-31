import Tile from './tile';
import { Point } from '../../util/geo';


class WarpTile extends Tile {

	constructor(data, ...props) {
		super(data, WarpTile.defaults, ...props);

		// warp target
		this.target = {
			mapId: data.properties.mapId,
			x: data.properties.x,
			y: data.properties.y,
			tileX: data.properties.tileX,
			tileY: data.properties.tileY
		};

		// use the warp tile's own coordinates if desired
		if (this.target.x === 'this') this.target.x = this.point.x;
		if (this.target.y === 'this') this.target.y = this.point.y;
		if (this.target.tileX === 'this') this.target.tileX = this.point.tileX;
		if (this.target.tileY === 'this') this.target.tileY = this.point.tileY;
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
