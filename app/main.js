import config from './config';
import Boot from './states/Boot';
import Preload from './states/Preload';
import Game from './states/Game';


var game = new Phaser.Game(config.width, config.height, config.renderer, config.name);
// TEMP
window.game = game;


// states
game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Game);


game.state.start('boot');


export default game;
