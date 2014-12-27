import EventEmitter from '../util/event-emitter';


class Entity extends EventEmitter {

	constructor() {
		super(...arguments);

		let properties = _.assign(Entity.defaults, ...arguments);

		// set properties
		_.forEach(properties, function(value, property) {
			this[property] = value;
		}, this);

		// bind to events
		_.forEach(this.events, function(handler, event) {
			this.on(event, handler);
		}, this);
	}

}


Entity.defaults = {

	type: 'entity',
	events: {},

};


export default Entity;

