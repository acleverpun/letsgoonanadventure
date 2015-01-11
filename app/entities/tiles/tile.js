import Entity from '../entity';
import { Point } from '../../util/geo';
import EventEmitter from '../../nixons/event-emitter';
import Walkable from '../../nixons/walkable';


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
			y: tileData.y - this.height,
			tileX: tileData.tileX,
			tileY: tileData.tileY
		});

		// properties
		// TODO: `tileData.visible` is impossible to work with in Tiled,
		// even though it's a checkbox, because it makes the entity vanish
		this.visibile = tileData.visibile;
	}

}


Tile.defaults = {};


export default Tile;
