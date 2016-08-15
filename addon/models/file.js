import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import BaseURL from './../mixins/baseurl';

export default Model.extend(BaseURL,{

	filename: attr('string'),

	originalname: attr('string'),

	//

	src: Ember.computed('filename', function() {
		return this.get('baseURL') + this.get('filename');
	}),

	//

	extension : Ember.computed('filename', function() {
		var array = this.get('filename').split('.');
		return array[array.length-1];
	}),

});
