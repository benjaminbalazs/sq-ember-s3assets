import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Mixin.create({

    baseURL: Ember.computed(function() {

        if ( config.S3.static ) {

            return config.S3.static + '/';

        } else if ( config.S3.cloudfront ) {

            return config.S3.cloudfront + '/';

        } else {

            return 'https://s3-'+config.S3.region + '.amazonaws.com/' + config.S3.bucket + '/';

        }

	}),

});
