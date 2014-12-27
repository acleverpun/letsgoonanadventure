import Entity from '../entity';


class Actor extends Entity {

	constructor(...props) {
		super(Actor.defaults, ...props);
	}

}


Actor.defaults = {
	type: 'actor',
	health: 100,
	speed: 50,
};


export default Actor;
