import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({

	filename: attr('string'),

	//

	src: Ember.computed('filename', function() {
		return this.get('baseURL') + this.get('filename');
	}),

	//

	baseURL: Ember.computed(function() {
		var config = Ember.getOwner(this)._lookupFactory('config:environment');
		return config.APP.protocol + 's3-'+config.S3.region + '.amazonaws.com/' + config.S3.bucket + '/';
	}),

	//

	extension : Ember.computed('filename', function() {
		var array = this.get('filename').split('.');
		return array[array.length-1];
	}),

});
