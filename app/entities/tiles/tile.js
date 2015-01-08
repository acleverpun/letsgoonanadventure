import Entity from '../entity';
import { Point } from '../../util/geo';


class Tile extends Entity {

	constructor(tileData, ...props) {
		super({ tile: tileData }, Tile.defaults, ...props);

		// dimensions
		this.width = tileData.width;
		this.height = tileData.height;

		// geo
		this.point = new Point({
			mapId: tileData.mapId,
			x: tileData.x,
			y: tileData.y - this.height,
			tileX: tileData.tileX,
			tileY: tileData.tileY
		});

		// properties
		// TODO: `tileData.visible` is impossible to work with in Tiled,
		// even though it's a checkbox, because it makes the entity vanish
		this.visibile = tileData.visibile;
	}


	update() {
		this.state.physics.arcade.overlap(this.state.player, this.sprite, () => {
			this.emit('enter', this.state.player);
		});
	}

}


Tile.defaults = {};


export default Tile;
