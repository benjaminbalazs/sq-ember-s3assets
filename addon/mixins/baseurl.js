import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Mixin.create({

    location: Ember.inject.service(),

    baseURL: Ember.computed(function() {

		return this.get('location.protocol') + 's3-'+config.S3.region + '.amazonaws.com/' + config.S3.bucket + '/';

	}),

});
