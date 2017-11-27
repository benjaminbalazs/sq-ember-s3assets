import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Mixin.create({

    baseURL: Ember.computed(function() {

		return 'https://s3-'+config.S3.region + '.amazonaws.com/' + config.S3.bucket + '/';

	}),

});
