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
		console.log(config.APP.protocol);
		return config.APP.protocol + 's3-'+config.S3.region + '.amazonaws.com/' + config.S3.bucket + '/';
	}),

	//

	extension : Ember.computed('filename', function() {
		var array = this.get('filename').split('.');
		return array[array.length-1];
	}),

});
