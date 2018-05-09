import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import config from 'ember-get-config';

export default Mixin.create({

    cloudfront: computed(function() {

        return config.S3.cloudfront;

	}),

});
