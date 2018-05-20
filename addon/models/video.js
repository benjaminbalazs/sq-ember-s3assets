import { computed } from '@ember/object';
import File from './file';
import attr from 'ember-data/attr';
import config from 'ember-get-config';

export default File.extend({

	state: attr('string'),

	completed_at: attr('date'),

	width: attr('number'),

	height: attr('number'),

	duration: attr('number'),

	preview: attr('string'),

	files: attr('array'),

	trailer: attr('boolean'),

	loop: attr('boolean'),

	autoplay: attr('boolean'),

	showtrailer: attr('boolean'),

	//

	videos: computed('files', function() {

        return this.get('files').filter(function(item) {

            return ( item.indexOf('/mp4/') !== -1 || item.indexOf('/hls/') !== -1 || item.indexOf('/webm/') !== -1 );

        }).map(function(item) {

			let type;

			if ( item.indexOf('/mp4/') !== -1 ) {

				type = "video/mp4";

			} else if ( item.indexOf('/webm/') !== -1 ) {

				type = "video/webm";

			} else if ( item.indexOf('/hls/') !== -1 ) {

				type = "application/x-mpegURL";

			}

			return {
				src: item,
				type: type,
			}

		});

    }),

    thumbnails: computed('files', function() {

        return this.get('files').filter(function(item) {

            return ( item.indexOf('/thumbs/') !== -1 );

        });

    }),

});
