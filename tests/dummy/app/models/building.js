import DS from 'ember-data';

const { belongsTo, hasMany, attr, Model } = DS;

export default Model.extend({
  name: attr('string'),
  company: belongsTo('company'),
  floors: hasMany('floor')
});
