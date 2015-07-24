import DS from 'ember-data';

const { belongsTo, hasMany, attr } = DS;

export default DS.Model.extend({
	name: attr('string'),
	company: belongsTo('company'),
	floors: hasMany('floor')
});