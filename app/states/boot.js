import State from './state';


class Boot extends State {

	create() {
		this.state.start('preload');
	}

}


export default Boot;
