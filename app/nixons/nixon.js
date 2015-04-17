class Nixon {

	constructor(entity, { mixOnEntity }) {
		this.entity = entity;

		// optionally extend the entity itself
		if (mixOnEntity === true) {
			let methods = Object.getOwnPropertyNames(this.constructor.prototype);

			_.forEach(methods, function(name) {
				let method = this[name];

				if (_.isFunction(method)) {
					this.entity[name] = method.bind(this);
				}
			}, this);
		}
	}


	init(state) {
		this.state = state;
	}

}


Nixon.namespace = null;


export default Nixon;
