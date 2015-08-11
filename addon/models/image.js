import DS from 'ember-data';

export default DS.Model.extend({

	filename: DS.attr('string'),
	
	sizes: DS.attr('number'),

	width: DS.attr('number'),

	height: DS.attr('number'),

});
