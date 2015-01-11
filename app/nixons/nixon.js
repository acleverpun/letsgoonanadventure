class Nixon {

	constructor(entity, { mixOnEntity }) {
		// optionally extend the entity itself
		if (mixOnEntity === true) {
			_.forEach(this.__proto__, function(method, key) {
				entity[key] = method.bind(this);
			}, this);
		}
	}

}


Nixon.namespace = null;


export default Nixon;
