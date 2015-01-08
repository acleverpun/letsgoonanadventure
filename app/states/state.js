class State {

	constructor(game) {}


	init() {}


	preload() {}


	create() {}


	update() {}


	spawn(Entity, ...props) {
		let entity = new Entity(...props);

		entity.init(this);

		return entity;
	}

}


export default State;
