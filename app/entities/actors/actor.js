import Entity from '../entity';
import EventEmitter from '../../nixons/event-emitter';


class Actor extends Entity {

	constructor(...props) {
		super(Actor.defaults, ...props);

		// nixons
		this.nixon(EventEmitter, { mixOnEntity: true });
	}

}


Actor.defaults = {
	type: 'actor',
	health: 100,
	speed: 50,
};


export default Actor;
