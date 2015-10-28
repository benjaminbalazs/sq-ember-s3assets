import File from './file';
import DS from 'ember-data';

export default File.extend({

	sizes: DS.attr('number'),

	width: DS.attr('number'),

	height: DS.attr('number'),

});
