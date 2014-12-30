import Entity from '../entity';


class Tile extends Entity {

	constructor(data, ...props) {
		super(Tile.defaults, ...props);

		// dimensions
		this.width = data.width;
		this.height = data.height;

		// geo
		// TODO: use up and coming `Point` class
		this.location = {
			map: game.state.getCurrentState().mapId,
			x: data.x,
			y: data.y,
			// TODO: take `16` from a grid config
			tileX: ~~(data.x / 16),
			tileY: ~~(data.y / 16)
		};
	}


	get locationString() {
		return `${this.location.tileX},${this.location.tileY}`;
	}

}


Tile.defaults = {};


export default Tile;
