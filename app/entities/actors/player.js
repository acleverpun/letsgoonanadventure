import Actor from './actor';


class Player extends Actor {

	constructor() {
		super(Player.defaults, ...arguments);
	}

}


Player.defaults = {

	type: 'player',

};


export default Player;
