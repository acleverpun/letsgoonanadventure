class Nixon {

	constructor(entity, { mixOnEntity }) {
		this.entity = entity;

		// optionally extend the entity itself
		if (mixOnEntity === true) {
			_.forEach(this.__proto__, function(method, key) {
				entity[key] = method.bind(this);
			}, this);
		}
	}


	init(state) {
		this.state = state;
	}

}


Nixon.namespace = null;


export default Nixon;
