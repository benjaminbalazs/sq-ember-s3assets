import Ember from 'ember';

export default Ember.Component.extend({

	tagName: '',

	//

	src: Ember.computed('model.src', function() {
		return this.get('model.src');
	}),

	//

	widthSizes: [160, 320, 480, 640, 960, 1280, 1920, 2560],

	srcset: Ember.computed('model.sizes', function() {

		var extension = this.get('model.extension');
		var baseURL = this.get('model.baseURL');

		var sizes = this.get('model.sizes');
		const array = [];

		for ( var i=0; i < sizes; i += 1 ) {

			array.push( baseURL + this.get('model.id') + '_' + this.widthSizes[i] + '.' + extension + ' ' + this.widthSizes[i] + 'w' );

		}

		return array.join(',');


	}),

	//


	sizes: Ember.computed('model.sizes', function() {


		var sizes = this.get('model.sizes');
		const array = [];

		for ( var i=0; i < sizes; i += 1 ) {
			//"(max-width: 480px) 100vw";
			array.push( "(max-width: " + this.widthSizes[i]/10 + 'em) ' + this.widthSizes[i] + 'vw' );

		}
		//console.log(array);
		//return sizes="(min-width: 36em) calc(.333 * (100vw - 12em)),100vw";
		array.push('100vw');
		return array.join(',');


	}),


});
