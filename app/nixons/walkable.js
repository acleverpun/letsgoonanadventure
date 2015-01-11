import Nixon from './nixon';


class Walkable extends Nixon {

	init(...args) {
		super(...args);

		// default the target entity to the player
		this.target = this.state.player.sprite;
	}


	update() {
		let entity = this.entity;
		let target = this.target;

		this.state.physics.arcade.overlap(target, entity.sprite, function() {
			entity.emit('enter', target);
		});
	}

}


export default Walkable;
