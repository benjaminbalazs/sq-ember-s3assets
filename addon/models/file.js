import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import config from 'ember-get-config';

export default Model.extend({

	filename: attr('string', { readOnly: true }),

	originalname: attr('string', { readOnly: true }),

	//

	src: computed('filename', function() {
		return this.get('filename');
	}),

	//

	extension : computed('filename', function() {
		var array = this.get('filename').split('.');
		return array[array.length-1];
	}),

	//

	original: computed('src', function() {
        return config.S3.files.cloudfront + '/' + this.get('src');
	}),

});
