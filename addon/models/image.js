import { computed } from '@ember/object';
import File from './file';
import attr from 'ember-data/attr';
import config from 'ember-get-config';

export default File.extend({

	sizes: attr('number', { readOnly: true }),

	width: attr('number', { readOnly: true }),

	height: attr('number', { readOnly: true }),

	preview: attr('string', { readOnly: true }),

	original: computed('src', function() {
        return config.S3.images.cloudfront + '/' + this.get('src');
	}),

});
