import Ember from 'ember';

export default Ember.Component.extend({

	fastboot: Ember.inject.service(),

	tagName: 'img',
	alt: null,
	classNames: 'sq-img',
	attributeBindings: ['src', 'filter', 'mask', 'link', 'alt', 'fade'],
	classNameBindings: ['show'],
	height: 'auto',
	fade: false,

	//

	widthSizes: [160, 320, 480, 640, 960, 1280, 1920, 2560],

	// INIT --------------------------------------------------------------------

	init() {

		this._super();

		this.initiate();

		this.addObserver('model', this, this.initiate);

		if ( this.get('preview') ) {

			this.set('src', this.get('preview'));

		}

	},

	willDestroy() {

		this._super();

		this.removeObserver('model', this, this.initiate);

	},

	initiate() {

		if ( this.get('default') !== null && this.get('model.id') ) {

			if ( this.get('model.isLoaded') === true ) {

				this.setupDefault();

			} else {

				var self = this;
				this.get('model').addObserver('isLoaded', this, function() {

					Ember.run.later(function() {
						self.didLoad();
					});

				});

			}

		}

	},

	didLoad() {

		this.get('model').removeObserver('isLoaded', this, this.didLoad);

		this.setupDefault();

	},

	click() {
		if ( this ) {
			this.sendAction('select');
		}
	},

	//

	setupDefault() {

		if ( this.getMaxSize() < this.get('default') ) {
			this.set('default', null);
		} else {
			this.set('src', this.getFilename(this.getPixelatedSize(this.get('default'))));
		}

		this.proportioner();

	},

	proportioner: Ember.observer('mask', 'src', function() {

		if ( this.get('fastboot.isFastBoot') !== true ) {

			var mask = this.get('mask');
			var self = this;

			if ( mask && this.get('element') ) {

				this.resize();

				Ember.$(this.get('element')).resize(function() {
					self.resize();
				});

			} else {

				this.resize();

			}

		}

	}),

	resize() {

		if ( this.get('fastboot.isFastBoot') !== true ) {

			var mask = this.get('mask');

			if ( mask ) {

				var proportion = 1;

				if ( mask === 'rectangle' ) {
					proportion = 3/4;
				} else if ( mask === 'landscape' ) {
					proportion = 9/16;
				} else if ( mask === 'triangle' ) {
					proportion = 80/115;
				} else if ( mask === 'vertical' ) {
					proportion = 4/3;
				}

				var width = Ember.$(this.get('element')).width();
				var height = Math.round(width * proportion);

				Ember.$(this.get('element')).attr( "height", height);

			} else {

				Ember.$(this.get('element')).attr( "height", 'auto');

			}

		}

	},

	// CALCULATE SIZE ONCE IT IS INSERTED --------------------------------------

	didInsertElement() {

		this._super();

		var self = this;

		if ( !this.get('default') ) {
			Ember.run.later(function() {
				self.update();
			});
		}

		this.proportioner();

		//

		if ( this.get('fade') === true ) {

			Ember.$(this.get('element')).one('load', function() {
				self.onLoad();
			});

		}


	},

	willDestroyElement() {

		if ( this.get('fade') === true ) {
			Ember.$(this.get('element')).off('load');
		}

	},

	onLoad() {

		this.set('show', true);

	},

	//

	update() {

		if ( this.get('model.isLoaded') === false || this.get('fastboot.isFastBoot') === true ) {
			return;
		}

		if ( this.get('isDestroyed') === false && this.$() ) {
			var width = this.getSuggestedSize();
			this.set('src', this.getFilename(width));
		}

	},

	// GETTERS -----------------------------------------------------------------

	getFilename(width) {

		if ( this.isStatic() ) {

			return this.get('model.src');

		} else if ( width < 160 ) {

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

	},

	isStatic() {

		if ( this.get('model.sizes') ) {
			return false;
		} else {
			return true;
		}
	}


});
