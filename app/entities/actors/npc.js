import Actor from './actor';


class NPC extends Actor {

	constructor(properties) {
		properties = _.assign(NPC.defaults, properties);
		super(properties);
	}

}


NPC.defaults = {
	type: 'npc',
};


export default NPC;
