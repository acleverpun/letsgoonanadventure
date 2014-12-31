var directions = ['north', 'south', 'east', 'west'];


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
			if (!_.isNull(tilemapData)) this.map = tilemapData.data;
		}

		// TODO: abstract this stuff into a helper
		if (_.isString(this.x)) {
			let x = +this.x;
			if (_.contains(directions, this.x)) {
				this.x = this.getEdge(this.x);
			} else {
				this.x = x;
			}
		}
		if (_.isString(this.y)) {
			let y = +this.y;
			if (_.contains(directions, this.y)) {
				this.y = this.getEdge(this.y);
			} else {
				this.y = y;
			}
		}
		if (_.isString(this.tileX)) {
			let tileX = +this.tileX;
			if (_.contains(directions, this.tileX)) {
				this.tileX = this.getEdge(this.tileX, true);
			} else {
				this.tileX = tileX;
			}
		}
		if (_.isString(this.tileY)) {
			let tileY = +this.tileY;
			if (_.contains(directions, this.tileY)) {
				this.tileY = this.getEdge(this.tileY, true);
			} else {
				this.tileY = tileY;
			}
		}

		if (_.isObject(this.map)) {
			// TODO: optimize
			if (!_.isNumber(this.tileX) && _.isNumber(this.x)) this.tileX = ~~(this.x / this.map.tilewidth);
			if (!_.isNumber(this.tileY) && _.isNumber(this.y)) this.tileY = ~~(this.y / this.map.tileheight);
			if (!_.isNumber(this.x) && _.isNumber(this.tileX)) this.x = this.tileX * this.map.tilewidth;
			if (!_.isNumber(this.y) && _.isNumber(this.tileY)) this.y = this.tileY * this.map.tileheight;
		}
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

		if (!_.isObject(this.map)) throw new Error('Map not yet loaded.');
		return edgeMap[direction](this.map);
	}

}


export { Point };
