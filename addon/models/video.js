import { computed } from '@ember/object';
import File from './file';
import attr from 'ember-data/attr';
import config from 'ember-get-config';

export default File.extend({

	state: attr('string', { readOnly: true }),

	completed_at: attr('date', { readOnly: true }),

	width: attr('number', { readOnly: true }),

	height: attr('number', { readOnly: true }),

	duration: attr('number', { readOnly: true }),

	preview: attr('string', { readOnly: true }),

	files: attr('array', { readOnly: true }),

	trailer: attr('boolean'),

	showtrailer: attr('boolean'),

	playback: attr('string', { defaultValue: "normal" }),

	// COMPUTED ----------------------------------------------------------------

	sources: computed('videos', 'cloudfront', function() {

		if ( this.get('videos') ) {

			const cloudfront = this.get('cloudfront');

			return this.get('videos').map(function(item) {

				return {
					src: cloudfront + "/" + item.src,
					type: item.type,
				}

			}).filter(function(item) {

				return ( item.src.indexOf('preview') === -1 && item.src.indexOf('M.m3u8') === -1 && item.src.indexOf('k.m3u8') === -1 );

			});

		}

	}),

	cloudfront: computed('category', function() {

		if ( this.get('category') === "video" ) {
			return config.S3.videos.cloudfront;
		} else {
			return config.S3['stock-videos'].cloudfront;
		}

	}),

	poster: computed('thumbnails', 'cloudfront', function() {

		let index = Math.floor(this.get('thumbnails.length') / 2);

		return this.get('cloudfront') + "/" + this.get('thumbnails')[index];

	}),

	previewVideo: computed('videos', function() {

		if ( this.get('videos') ) {

			const video = this.get('videos').find(function(item) {
				if ( item.src.indexOf('preview') !== -1 ) {
					return true;
				}
			});

			return {
				src: this.get('cloudfront') + "/" + video.src,
				type: video.type,
			};

		}

	}),

	// BASICS ------------------------------------------------------------------

	videos: computed('files', function() {

		if ( this.get('files') ) {

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

		}

    }),

    thumbnails: computed('files', function() {

		if ( this.get('files') ) {

			return this.get('files').filter(function(item) {

	            return ( item.indexOf('/thumbs/') !== -1 );

	        });

		}

    }),

});
