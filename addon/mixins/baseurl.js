import Ember from 'ember';

export default Ember.Mixin.create({

    baseURL: Ember.computed(function() {
		var config = Ember.getOwner(this)._lookupFactory('config:environment');
		return config.APP.protocol + 's3-'+config.S3.region + '.amazonaws.com/' + config.S3.bucket + '/';
	}),

});
