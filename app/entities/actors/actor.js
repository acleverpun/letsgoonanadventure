import Entity from '../entity';


class Actor extends Entity {

	constructor(properties) {
		properties = _.assign(Actor.defaults, properties);
		super(properties);
	}

}


Actor.defaults = {
	type: 'actor',
	health: 100,
	speed: 50,
};


export default Actor;
