import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Component.extend({

	fastboot: Ember.inject.service(),

	tagName: 'img',
	alt: null,
	classNames: 'sq-img',
	attributeBindings: ['src', 'srcset', 'sizes', 'filter', 'mask', 'link', 'alt', 'fade'],
	classNameBindings: ['loaded'],
	height: 'auto',
	fade: false,
	sizes: "100vw",
	loaded: false,

	widthSizes: [160, 320, 480, 640, 960, 1280, 1920, 2560],

	click() {
		if ( this ) {
			this.sendAction('select');
		}
	},

	didInsertElement() {

		const self = this;

		this.$().on('load', function(event) {

			if ( self.get('loaded') === false ) {
				self.set('loaded', true);
				self.sendAction('onload', event);
			}

		});

		this.$().on('error', function(event) {

			self.sendAction('onerror', event);

		});

	},

	willDestroyElement() {

		this.$().off('load');
		this.$().off('onerror');

	},

	//

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

	src: Ember.computed('model.src', function() {

		if ( this.get('model.preview') ) {
			return this.get('model.preview');
		} else {
			return this.get('model.original');
		}

	}),

	srcset: Ember.computed('model.sizes', function() {

		if ( this.get('model.sizes') ) {

			let array = [];

			for ( var i=0; i < this.get('model.sizes'); i += 1 ) {

				var size = this.widthSizes[i];

				let item = this.getFilename(size) + " " + size + "w";
				array.push(item);

			}

			return array.join(", ");

		} else {

			return null;

		}

	}),

	getFilename(width) {

		let imgix;
		let src;

		if ( this.get('model.category') === "image" ) {

			imgix = config.S3.imgix;

		} else {

			imgix = config.S3STOCK.imgix;

		}

		return imgix + "/" + this.get('model.src') + "?w=" + width + "&auto=format,compress&fit=max";

	},

});
