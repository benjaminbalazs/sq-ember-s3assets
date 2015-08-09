import DS from 'ember-data';

export default DS.Model.extend({

	sizes: DS.attr('number'),

	width: DS.attr('number'),

	height: DS.attr('number'),

});
