import Nixon from './nixon';


class Walkable extends Nixon {

	update() {
		let entity = this.entity;
		let state = entity.state;

		// TODO: let nixons apply to specific sprites/groups, instead of just the player
		state.physics.arcade.overlap(state.player.sprite, entity.sprite, function() {
			entity.emit('enter', state.player.sprite);
		});
	}

}


export default Walkable;
