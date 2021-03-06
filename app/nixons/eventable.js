import Nixon from './nixon';


const DEFAULT_MAX_LISTENERS = 32;


let error = function(message, ...args) {
	console.error.apply(console, [message].concat(args));
	console.trace();
};


// Adapted from https://gist.github.com/bloodyowl/41b1de3388c626796eca
class Eventable extends Nixon {

	constructor(entity, options) {
		super(entity, options);

		this._maxListeners = DEFAULT_MAX_LISTENERS;
		this._events = {};

		// bind to events
		_.forEach(entity.events, function(handler, event) {
			this.on(event, handler.bind(entity));
		}, this);
	}


	on(type, listener, target = null) {
		if (typeof listener !== 'function') {
			throw new TypeError();
		}

		let listeners = this._events[type] || (this._events[type] = []);
		if (listeners.indexOf(listener) !== -1) {
			return this;
		}

		listeners.push(listener.bind(target));

		if (listeners.length > this._maxListeners) {
			let message = 'possible memory leak, added %i %s listeners, use EventEmitter#setMaxListeners(number) if you want to increase the limit (%i now)';
			error(message, listeners.length, type, this._maxListeners);
		}

		return this;
	}


	once(type, listener, target) {
		let onceCallback = () => {
			this.off(type, onceCallback);
			listener.apply(target, arguments);
		};

		return this.on(type, onceCallback);
	}


	off(type, ...args) {
		if (args.length === 0) {
			this._events[type] = null;
		}

		let listener = args[0];
		if (typeof listener !== 'function') {
			throw new TypeError();
		}

		let listeners = this._events[type];
		if (!listeners || !listeners.length) {
			return this;
		}

		let indexOfListener = listeners.indexOf(listener);
		if (indexOfListener === -1) {
			return this;
		}

		listeners.splice(indexOfListener, 1);

		return this;
	}


	emit(type, ...args) {
		let listeners = this._events[type];

		if (!listeners || !listeners.length) {
			return false;
		}

		listeners.forEach(fn => fn.apply(null, args));

		return true;
	}


	setMaxListeners(newMaxListeners) {
		if (parseInt(newMaxListeners) !== newMaxListeners) {
			throw new TypeError();
		}

		this._maxListeners = newMaxListeners;
	}

}


export default Eventable;
