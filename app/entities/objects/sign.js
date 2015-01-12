import Entity from '../entity';
import EventEmitter from '../../nixons/event-emitter';
import Walkable from '../../nixons/walkable';
import { Point } from '../../util/geo';


class Sign extends Entity {

	constructor(tileData, ...props) {
		super({ tile: tileData }, Sign.defaults, ...props);

		// nixons
		this.nixon(EventEmitter, { mixOnEntity: true });
		// this.nixon(Walkable);

		// dimensions
		this.width = tileData.width;
		this.height = tileData.height;

		// geo
		this.point = new Point({
			mapId: tileData.mapId,
			x: tileData.x,
			y: tileData.y - this.height
		});
	}


	init(...args) {
		super(...args);

		this.state.physics.arcade.enable(this.sprite);
		window.sign = this;

		// adjust the bounding box to leak 1px outside the tile
		this.sprite.body.setSize(18, 18, -1, -1);
		this.sprite.body.immovable = true;
	}


	update() {
		let target = this.target;

		this.state.physics.arcade.overlap(target, this.sprite);
	}

}


// Sign.defaults = {};
Sign.defaults = {
	events: {
		use: function() {
			log('SOME OF THEM WANT TO USE YOU');
		}
	}
};


export default Sign;
