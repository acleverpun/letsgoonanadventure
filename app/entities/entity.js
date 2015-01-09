import EventEmitter from '../nixons/event-emitter';


class Entity {

	constructor(...props) {
		super();

		this.nixons = {};
		this.nixon(EventEmitter, false);

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
		this.sprite = this.state.add.sprite(x, y, this.id);

		// enable physics
		this.state.physics.arcade.enable(this.sprite);

		// set dimensions
		this.sprite.body.setSize(this.width, this.height);

		// set properties
		// TODO: this is very useful in theory (and efficient),
		// but setting "visible" in Tiled entities makes them vanish on the map
		if (!_.isUndefined(this.visible)) this.sprite.visible = this.visible;

		// add passthrough methods
		if (this.update) this.sprite.update = this.update.bind(this);
	}


	nixon(Nixon, namespace = Nixon.namespace) {
		return new Nixon(this, namespace);
	}

}


Entity.defaults = {
	type: 'entity',
	events: {},
};


export default Entity;
