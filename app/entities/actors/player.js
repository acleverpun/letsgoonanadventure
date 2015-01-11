import Actor from './actor';
import Input from '../../util/input';


class Player extends Actor {

	constructor(spawnPoint, ...props) {
		super(Player.defaults, ...props);

		this.id = 'player';
		this.point = spawnPoint;

		// TODO: get from a config setting, probably (not the map data, which may be diff)
		this.width = 16;
		this.height = 16;
	}


	init(state) {
		super(state);

		// TODO: this shouldn't be necessary once it has a texture
		this.sprite.width = 16;
		this.sprite.height = 16;
		// this.sprite.body.collideWorldBounds = true;

		// camera
		this.state.camera.follow(this.sprite);

		this.colliders = _.filter(this.state.layers, {
			data: {
				isCollidable: true
			}
		});
	}


	update() {
		// Input events
		let inputEvents = Input.checkEvents(this.state.game);

		// movement
		this.sprite.body.velocity.y = 0;
		this.sprite.body.velocity.x = 0;

		if (inputEvents.has(Input.Event.UP)) {
			this.sprite.body.velocity.y -= 100;
		}
		if (inputEvents.has(Input.Event.DOWN)) {
			this.sprite.body.velocity.y += 100;
		}

		if (inputEvents.has(Input.Event.LEFT)) {
			this.sprite.body.velocity.x -= 100;
		}
		if (inputEvents.has(Input.Event.RIGHT)) {
			this.sprite.body.velocity.x += 100;
		}

		// collision
		this.colliders.forEach(function(collider) {
			this.state.physics.arcade.collide(this.sprite, collider);
		}, this);
	}

}


Player.defaults = {
	type: 'player',
};


export default Player;
