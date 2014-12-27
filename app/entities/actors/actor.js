import Entity from '../entity';


class Actor extends Entity {

	constructor() {
		super(Actor.defaults, ...arguments);
	}

}


Actor.defaults = {

	type: 'actor',
	health: 100,
	speed: 50,

};


export default Actor;
