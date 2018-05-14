import $ from 'jquery';
import { observer, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import config from 'ember-get-config';

export default Component.extend({

	fastboot: service(),

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

	proportioner: observer('mask', 'src', function() {

		if ( this.get('fastboot.isFastBoot') !== true ) {

			var mask = this.get('mask');
			var self = this;

			if ( mask && this.get('element') ) {

				this.resize();

				$(this.get('element')).resize(function() {
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

				var width = $(this.get('element')).width();
				var height = Math.round(width * proportion);

				$(this.get('element')).attr( "height", height);

			} else {

				$(this.get('element')).attr( "height", 'auto');

			}

		}

	},

	src: computed('model.src', function() {

		if ( this.get('model.preview') ) {
			return this.get('model.preview');
		} else {
			return this.get('model.original');
		}

	}),

	srcset: computed('model.sizes', function() {

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

			imgix = config.S3.images.imgix;

		} else {

			imgix = config.S3['stock-images'].imgix;

		}

		return imgix + "/" + this.get('model.src') + "?w=" + width + "&auto=format,compress&fit=max";

	},

});
