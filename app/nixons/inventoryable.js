import Nixon from './nixon';
import Inventory from '../models/inventory';


class Inventoryable extends Nixon {

	constructor(...args) {
		super(...args);

		this.inventory = new Inventory();
		this.entity.inventory = this.inventory;
	}

}


export default Inventoryable;
