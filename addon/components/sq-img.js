import Ember from 'ember';

export default Ember.Component.extend({

	tagName: 'img',
	alt: '',
	classNames: 'sq-img',
	attributeBindings: 'src',

	//

	widthSizes: [160, 320, 480, 640, 960, 1280, 1920, 2560],

	// INIT --------------------------------------------------------------------

	init() {

		this._super();

		this.initiate();

		this.addObserver('model', this, function() {

			this.initiate();

		});

	},

	actions: {

		click() {
			this.sendAction('click');
		},

	},

	initiate() {

		if ( this.get('default') !== null && this.get('model.id') ) {

			if ( this.get('model.isLoaded') === true ) {

				this.setupDefault();

			} else {


			}

		}

	},

	//

	setupDefault() {

		if ( this.getMaxSize() < this.get('default') ) {
			this.set('default', null);
		} else {
			this.set('src', this.getFilename(this.getPixelatedSize(this.get('default'))));
		}

	},

	// CALCULATE SIZE ONCE IT IS INSERTED --------------------------------------

	didInsertElement() {

		this._super();

		if ( !this.get('default') ) {
			Ember.run.later(this, this.update);
		}

	},

	//

	update() {

		if ( this.get('model.isLoaded') === false ) {
			return;
		}

		var width = this.getSuggestedSize();
		this.set('src', this.getFilename(width));

	},

	// GETTERS -----------------------------------------------------------------

	getFilename(width) {

		if ( width === 0 ) {

			return this.get('model.src');

		} else {

			var extension = this.get('model.extension');
			var baseURL = this.get('model.baseURL');

			return baseURL + this.get('model.id') + '_' + width + '.' + extension;

		}

	},

	getSuggestedSize() {

		var width = this.$().innerWidth();

		var size = 0;

		for ( var i=0; i < this.get('model.sizes'); i += 1 ) {

			var start = 0;
			var end = this.widthSizes[i];

			if ( width > start && width <= end ) {
				size = end;
				break;
			}

			start = end;

		}

		if ( size !== 0 ) {
			return this.getPixelatedSize(size);
		} else {
			return size;
		}

	},

	getPixelatedSize(size) {

		var ratio = ( window.devicePixelRatio || 1 );

		var targetedsize = size * ratio;

		if ( targetedsize > this.getMaxSize() ) {
			return 0;
		} else {
			return targetedsize;
		}

	},

	getMaxSize() {

		return this.widthSizes[this.get('model.sizes')-1];

	}


});
