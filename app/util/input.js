import config from '../config';


// TODO: currently this class grabs way too much input.
// Idealy, this will have a small subset of inputs that have direct mappings to the Event types

let Event = {
	UP: Symbol('up'),
	DOWN: Symbol('down'),
	LEFT: Symbol('left'),
	RIGHT: Symbol('right'),
	USE: Symbol('use'),
};


export default {
	// Input Event Types
	Event,

	init(game) {
		// TODO: have Input mappings be configurable from a menu (ie don't enable Gamepad/remap keys)

		// Start listening for Gamepad events
		game.input.gamepad.start();

		// Add keys to start listening to
		game.input.keyboard.addKey(Phaser.Keyboard.UP);
		game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKey(Phaser.Keyboard.A);
		game.input.keyboard.addKey(Phaser.Keyboard.S);
		game.input.keyboard.addKey(Phaser.Keyboard.D);
		game.input.keyboard.addKey(Phaser.Keyboard.H);
		game.input.keyboard.addKey(Phaser.Keyboard.J);
		game.input.keyboard.addKey(Phaser.Keyboard.K);
		game.input.keyboard.addKey(Phaser.Keyboard.L);
		game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},

	// Use game settings/config to figure out what keys/gamepad buttons to listen for
	// This is expensive. Don't call more than once per tick
	checkEvents(game) {
		let gp = game.input.gamepad;
		let kb = game.input.keyboard;
		let events = new Set();

		// Check Gamepad Events
		if (gp.supported && gp.active) {
			// Only check pad1 for events
			let pad = gp.pad1;

			if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
				events.add(Event.UP);
			}
			if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
				events.add(Event.DOWN);
			}
			if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
				events.add(Event.LEFT);
			}
			if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
				events.add(Event.RIGHT);
			}

			if (pad.isDown(Phaser.Gamepad.XBOX360_A)) {
				events.add(Event.USE);
			}
		}

		// Check Keybaord events
		if (kb.isDown(Phaser.Keyboard.UP) || kb.isDown(Phaser.Keyboard.W) || kb.isDown(Phaser.Keyboard.K)) {
			events.add(Event.UP);
		}
		if (kb.isDown(Phaser.Keyboard.DOWN) || kb.isDown(Phaser.Keyboard.S) || kb.isDown(Phaser.Keyboard.J)) {
			events.add(Event.DOWN);
		}
		if (kb.isDown(Phaser.Keyboard.LEFT) || kb.isDown(Phaser.Keyboard.A) || kb.isDown(Phaser.Keyboard.H)) {
			events.add(Event.LEFT);
		}
		if (kb.isDown(Phaser.Keyboard.RIGHT) || kb.isDown(Phaser.Keyboard.D) || kb.isDown(Phaser.Keyboard.L)) {
			events.add(Event.RIGHT);
		}
		if (kb.isDown(Phaser.Keyboard.ENTER) || kb.isDown(Phaser.Keyboard.SPACEBAR)) {
			events.add(Event.USE);
		}

		return events;
	},
};
