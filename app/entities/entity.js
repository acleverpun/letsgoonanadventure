import EventEmitter from '../util/event-emitter';


class Entity extends EventEmitter {

	constructor(...props) {
		super();

		let properties = _.assign(Entity.defaults, ...props);

		// set properties
		_.forEach(properties, function(value, property) {
			this[property] = value;
		}, this);

		// bind to events
		_.forEach(this.events, function(handler, event) {
			this.on(event, handler.bind(this));
		}, this);
	}


	init(state) {
		this.state = state;
	}

}


Entity.defaults = {
	type: 'entity',
	events: {},
};


export default Entity;

