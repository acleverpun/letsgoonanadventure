class Inventory extends Array {

	// Adds one or more item to inventory
	add(...items) {
		// TODO: once we have `Items`, this should make sure each thing added is one
		_.forEach(items, function(item) {
			this.push(item);
		}, this);

		return this;
	}


	// Removes one or more item to inventory
	remove(...items) {
		_.pull(this, ...items);

		return this;
	}

}


export default Inventory;
