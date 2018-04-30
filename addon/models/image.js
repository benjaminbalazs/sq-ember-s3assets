import File from './file';
import attr from 'ember-data/attr';

export default File.extend({

	sizes: attr('number'),

	width: attr('number'),

	height: attr('number'),

	preview: attr('string'),

	original: Ember.computed('src', function() {
		return this.get('src');
	}),

});
