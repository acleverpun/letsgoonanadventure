import Actor from './actor';


class NPC extends Actor {

	constructor(...props) {
		super(NPC.defaults, ...props);
	}

}


NPC.defaults = {
	type: 'npc',
};


export default NPC;
