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

		// TODO: let nixons apply to specific sprites/groups, instead of just the player
		this.state.physics.arcade.overlap(target, entity.sprite, function() {
			entity.emit('enter', target);
		});
	}

}


export default Walkable;
