import State from './state';


class Boot extends State {

	create() {
		// initial background
		this.stage.backgroundColor = '#000';

		// scaling
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// centering
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		// automatically set screen size
		this.scale.setScreenSize(true);

		this.state.start('preload');
	}

}


export default Boot;
