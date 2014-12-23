import Actor from './actor';


class Player extends Actor {

	constructor(properties) {
		properties.type = 'player';
		super(properties);
	}

}


export default Player;
