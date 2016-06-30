import DS from 'ember-data';

const { hasMany, attr, Model } = DS;

export default Model.extend({
  name: attr('string'),
  buildings: hasMany('building')
});
