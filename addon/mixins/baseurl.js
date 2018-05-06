import Ember from 'ember';
import config from 'ember-get-config';

export default Ember.Mixin.create({

    cloudfront: Ember.computed(function() {

        return config.S3.cloudfront;

	}),

});
