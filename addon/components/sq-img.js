import { inject as service } from '@ember/service';
import Component from '@ember/component';
import Proportioner from 'sq-ember-s3assets/mixins/proportioner';

export default Component.extend(Proportioner, {

	fastboot: service(),

	tagName: 'img',
	alt: null,
	classNames: 'sq-img',
	attributeBindings: ['src', 'srcset', 'sizes', 'filter', 'mask', 'link', 'alt', 'fade'],
	classNameBindings: ['loaded'],
	height: 'auto',
	loaded: false,

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

});
