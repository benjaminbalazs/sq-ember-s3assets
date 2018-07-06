import $ from 'jquery';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';

export default Mixin.create({

    fastboot: service(),

    _onDidInsertElement: on('didInsertElement', function() {

		this.proportioner();

	}),

    proportioner: observer('mask', 'src', function() {

		if ( this.get('fastboot.isFastBoot') !== true && this.get('mask') ) {

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
					proportion = 0.8;
				} else if ( mask === 'vertical' ) {
					proportion = 4/3;
                }

				var width = $(this.get('element')).width();
				var height = Math.round(width * proportion);

				$(this.get('element')).css( "height", height);

			} else {

				$(this.get('element')).css( "height", 'auto');

			}

		}

	},

});
