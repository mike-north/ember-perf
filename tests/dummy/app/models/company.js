import DS from 'ember-data';

const { hasMany, attr } = DS;

export default DS.Model.extend({
	name: attr('string'),
	buildings: hasMany('building')
});