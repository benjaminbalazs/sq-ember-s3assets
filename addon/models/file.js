import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

	filename: DS.attr('string'),

	//

	src: Ember.computed('filename', function() {
		return this.get('baseURL') + this.get('filename');
	}),

	//

	baseURL: Ember.computed(function() {
		var config = this.container.lookupFactory('config:environment');
		return 'http://'+config.APP.s3region + '.amazonaws.com/' + config.APP.s3bucket + '/';
	}),

});
