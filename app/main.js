import config from './config';
import preload from './game-preload';
import create from './game-create';
import update from './game-update';
import render from './game-render';


var game = new Phaser.Game(config.width, config.height, config.renderer, config.name, {
	preload: preload,
	create: create,
	update: update,
	render: render
});


export default game;
