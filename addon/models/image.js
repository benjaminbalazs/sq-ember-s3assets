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

	srcset: computed(function() {

        let widthSizes = [160, 320, 480, 640, 960, 1280, 1920, 2560];

        if ( this.get('sizes') ) {

			let array = [];

			for ( var i=0; i < this.get('sizes'); i += 1 ) {

				var size = widthSizes[i];

				const filename = config.S3.images.imgix + "/" + this.get('src') + "?w=" + size + "&auto=format,compress&fit=max";

				const item = filename + " " + size + "w";

				array.push(item);

			}

			return array.join(", ");

		} else {

			return null;

		}

    }),

});
