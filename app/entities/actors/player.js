import Actor from './actor';


class Player extends Actor {

	constructor(...props) {
		super(Player.defaults, ...props);
	}

}


Player.defaults = {
	type: 'player',
};


export default Player;
