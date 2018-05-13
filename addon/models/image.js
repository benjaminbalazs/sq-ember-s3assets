import { computed } from '@ember/object';
import File from './file';
import attr from 'ember-data/attr';
import config from 'ember-get-config';

export default File.extend({

	sizes: attr('number'),

	width: attr('number'),

	height: attr('number'),

	preview: attr('string'),

	original: computed('src', function() {
        return config.S3.images.cloudfront + '/' + this.get('src');
	}),

});
