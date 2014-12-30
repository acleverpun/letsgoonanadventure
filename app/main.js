import config from './config';
import states from './states';


var game = new Phaser.Game(config.width, config.height, config.renderer, config.name);

// TODO: remove
window.game = game;
window.log = (...args) => { console.log(...args); };


// states
game.state.add('boot', states.Boot);
game.state.add('load', states.Load);
game.state.add('game', states.Game);


game.state.start('boot');


export default game;
