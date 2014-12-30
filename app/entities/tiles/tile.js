import Entity from '../entity';
import { Point } from '../../util/geo';


class Tile extends Entity {

	constructor(data, ...props) {
		super(Tile.defaults, ...props);

		// dimensions
		this.width = data.width;
		this.height = data.height;

		// geo
		this.location = new Point({
			x: data.x,
			y: data.y
		});
	}


	get locationString() {
		return `${this.location.tileX},${this.location.tileY}`;
	}

}


Tile.defaults = {};


export default Tile;
