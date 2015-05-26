import Entity from '../entity';
import EventEmitter from '../../nixons/eventable';
import Walkable from '../../nixons/walkable';
import { Point } from '../../util/geo';


class Tile extends Entity {

	constructor(tileData, ...props) {
		super({ tile: tileData }, Tile.defaults, ...props);

		// nixons
		this.nixon(EventEmitter, { mixOnEntity: true });
		this.nixon(Walkable);

		// dimensions
		this.width = tileData.width;
		this.height = tileData.height;

		// geo
		this.point = new Point({
			mapId: tileData.mapId,
			x: tileData.x,
			y: tileData.y - this.height
		});

		// properties
		// TODO: `tileData.visible` is impossible to work with in Tiled,
		// even though it's a checkbox, because it makes the entity vanish
		this.visibile = tileData.visibile;
	}

}


Tile.defaults = {};


export default Tile;
