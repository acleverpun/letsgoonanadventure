import Nixon from './nixon';
import Inventory from '../models/inventory';


class Inventoryable extends Nixon {

	constructor(...args) {
		super(...args);

		this.inventory = new Inventory();
		this.entity.inventory = this.inventory;
		this.entity.events = {};
	}


	init() {
		/* TODO:
		 * I'm not sure I like that these bind manually,
		 * but I also don't like how the entities do this (`Entity.defaults.events.whatever`)
		 *
		 * Hell, I'm not even sure if we should have events for this,
		 * or if we should just have things say `entity.inventory.add(...things)` directly
		 */

		this.entity.on('addItem', function(...items) {
			this.inventory.add(...items);
		}, this.entity);

		this.entity.on('removeItem', function(...items) {
			this.inventory.remove(...items);
		}, this.entity);
	}

}


export default Inventoryable;
