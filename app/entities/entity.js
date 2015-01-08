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

		// add the sprite
		let { x, y } = this.point;
		this.sprite = this.state.game.add.sprite(x, y);

		// enable physics
		this.state.physics.arcade.enable(this.sprite);

		// set dimensions
		this.sprite.body.setSize(this.width, this.height);

		// add passthrough methods
		if (this.update) this.sprite.update = this.update.bind(this);
	}

}


Entity.defaults = {
	type: 'entity',
	events: {},
};


export default Entity;

