class Entity {

	// NOTE: call super if extended
	constructor(...props) {
		super();

		this.nixons = {};

		let properties = _.assign(Entity.defaults, ...props);

		// set properties
		_.forEach(properties, function(value, property) {
			this[property] = value;
		}, this);
	}


	// NOTE: call super if extended
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
		this.sprite.update = this.tick.bind(this);

		// call init for nixons
		_.forEach(this.nixons, function(nixon) {
			if (_.isFunction(nixon.init)) nixon.init(this.state);
		}, this);
	}


	// calls update for entity and all components
	// NOTE: call super if extended
	tick() {
		if (_.isFunction(this.update)) this.update();

		_.forEach(this.nixons, function(nixon) {
			if (_.isFunction(nixon.update)) nixon.update();
		});
	}


	// NOTE: call super if extended
	nixon(Nixon, options = {}) {
		// default namespace to one defined on the constructor,
		// and if none exists use the camelCased name of the nixon class
		if (!options.namespace) options.namespace = Nixon.namespace;
		if (!options.namespace) options.namespace = Nixon.name[0].toLowerCase() + Nixon.name.slice(1);

		let nixon = new Nixon(this, options);
		this.nixons[options.namespace] = nixon;

		return nixon;
	}

}


Entity.defaults = {
	type: 'entity',
	events: {},
};


export default Entity;
