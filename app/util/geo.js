export class Point {

	constructor(data) {
		// set whitelisted properties
		_.forEach(['mapId', 'map', 'x', 'y', 'tileX', 'tileY'], function(prop) {
			this[prop] = data[prop];
		}, this);

		// TODO: remove global
		if (_.isUndefined(this.mapId)) this.mapId = game.state.getCurrentState().mapId;
		if (_.isUndefined(this.map)) this.map = game.state.getCurrentState().map;

		if (_.isString(this.x)) this.x = this.getEdge(this.x);
		if (_.isString(this.y)) this.y = this.getEdge(this.y);

		if (!this.tileX && this.x) this.tileX = ~~(this.x / this.map.tilewidth);
		if (!this.tileY && this.y) this.tileY = ~~(this.y / this.map.tileheight);

		if (_.isString(this.tileX)) this.tileX = this.getEdge(this.tileX, true);
		if (_.isString(this.tileY)) this.tileY = this.getEdge(this.tileY, true);

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

		return edgeMap[direction](this.map);
	}

}


export { Point };
