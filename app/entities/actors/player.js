import Actor from './actor';


class Player extends Actor {

	constructor(properties) {
		properties = _.assign(Player.defaults, properties);
		super(properties);
	}

}


Player.defaults = {
	type: 'player',
};


export default Player;
