import Tile from './tile';


class WarpTile extends Tile {

	constructor(data, ...props) {
		super(data, WarpTile.defaults, ...props);

		// warp target
		// TODO: use up and coming `Point` class
		this.target = {
			map: data.properties.map,
			tileX: +data.properties.tileX,
			tileY: +data.properties.tileY
		};
	}


}


WarpTile.defaults = {
	events: {
		enter: function(entity) {
			// load the game state, with the new map
			game.state.start('game', true, false, this.target);
		}
	}
};


export default WarpTile;
