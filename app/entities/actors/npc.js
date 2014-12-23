import Actor from './actor';


class NPC extends Actor {

	constructor(properties) {
		properties.type = 'npc';
		super(properties);
	}

}


export default NPC;
