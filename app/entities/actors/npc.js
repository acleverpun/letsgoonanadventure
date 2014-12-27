import Actor from './actor';


class NPC extends Actor {

	constructor() {
		super(NPC.defaults, ...arguments);
	}

}


NPC.defaults = {

	type: 'npc',

};


export default NPC;
