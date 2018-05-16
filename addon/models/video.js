import { computed } from '@ember/object';
import File from './file';
import attr from 'ember-data/attr';
import config from 'ember-get-config';

export default File.extend({

	width: attr('number'),

	height: attr('number'),

	duration: attr('number'),

	state: attr('string'),

	completed_at: attr('date'),

	preview: attr('string'),

	files: attr('array'),

	trailer: attr('boolean'),

	loop: attr('boolean'),

	autoplay: attr('boolean'),

	showtrailer: attr('boolean'),

});
