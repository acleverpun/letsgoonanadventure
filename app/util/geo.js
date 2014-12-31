export class Point {

	constructor(location) {
		// set whitelisted properties
		_.forEach(['mapId', 'map', 'x', 'y', 'tileX', 'tileY'], function(prop) {
			this[prop] = location[prop];
		}, this);

		// TODO: remove global
		if (_.isUndefined(this.mapId)) this.mapId = game.state.getCurrentState().mapId;
		if (_.isUndefined(this.map)) {
			let tilemapData = game.cache.getTilemapData(this.mapId);
			if (_.isNull(tilemapData)) return;
			this.map = tilemapData.data;
		}

		if (_.isString(this.x)) {
			let x = +this.x;
			if (_.isNaN(x)) {
				this.x = this.getEdge(this.x);
			} else {
				this.x = x;
			}
		}
		if (_.isString(this.y)) {
			let y = +this.y;
			if (_.isNaN(y)) {
				this.y = this.getEdge(this.y);
			} else {
				this.y = y;
			}
		}

		if (!this.tileX && this.x) this.tileX = ~~(this.x / this.map.tilewidth);
		if (!this.tileY && this.y) this.tileY = ~~(this.y / this.map.tileheight);

		if (_.isString(this.tileX)) {
			let tileX = +this.tileX;
			if (_.isNaN(tileX)) {
				this.tileX = this.getEdge(this.tileX, true);
			} else {
				this.tileX = tileX;
			}
		}
		if (_.isString(this.tileY)) {
			let tileY = +this.tileY;
			if (_.isNaN(tileY)) {
				this.tileY = this.getEdge(this.tileY, true);
			} else {
				this.tileY = tileY;
			}
		}

		if (!this.x && this.tileX) this.x = this.tileX * this.map.tilewidth;
		if (!this.y && this.tileY) this.x = this.tileY * this.map.tileheight;
	}


	getEdge(direction, inTiles) {
		let tileHeight = (inTiles) ? 1 : this.map.tileheight;
		let tileWidth = (inTiles) ? 1 : this.map.tilewidth;

		let edgeMap = {
			north: (map) => 0,
			south: (map) => map.height * tileHeight,
			east: (map) => map.width * tileWidth - tileWidth,
			west: (map) => 0
		};
		log('direction', direction);

		return edgeMap[direction](this.map);
	}

}


export { Point };
