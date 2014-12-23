import EventEmitter from '../util/event-emitter';


var defaults = {
	type: 'actor',
	health: 100,
	speed: 50
};


class Actor extends EventEmitter {

	constructor(properties) {
		properties = _.assign(defaults, properties);

		this.name = properties.name;
		this.type = properties.type;
		this.health = properties.health;
		this.speed = properties.speed;
	}

}


export default Actor;
