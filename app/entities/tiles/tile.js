import Entity from '../entity';
import { Point } from '../../util/geo';


class Tile extends Entity {

	constructor(data, ...props) {
		super(Tile.defaults, ...props);

		// dimensions
		this.width = data.width;
		this.height = data.height;

		// geo
		this.point = new Point({
			mapId: data.mapId,
			x: data.x,
			y: data.y,
			tileX: data.tileX,
			tileY: data.tileY
		});
	}


	update() {
		this.state.physics.arcade.overlap(this.state.player, this.sprite, () => {
			this.emit('enter', this.state.player);
		});
	}

}


Tile.defaults = {};


export default Tile;
