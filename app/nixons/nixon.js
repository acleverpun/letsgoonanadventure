class Nixon {

	constructor(entity, namespace) {
		// if no namespace is desired, extend the entity itself
		if (namespace === false) {
			_.forEach(this.__proto__, function(method, key) {
				entity[key] = method.bind(this);
			}, this);
		} else {
			entity.nixons[namespace] = this;
		}
	}

}


Nixon.namespace = 'nixon';


export default Nixon;
