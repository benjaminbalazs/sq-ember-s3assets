import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import BaseURL from './../mixins/baseurl';

export default Model.extend(BaseURL,{

	filename: attr('string'),

	originalname: attr('string'),

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

	original: computed('src', 'cloudfront', function() {
        return this.get('cloudfront') + '/' + this.get('src');
	}),

});
