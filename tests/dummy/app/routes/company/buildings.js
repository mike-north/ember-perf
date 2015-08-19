import Ember from 'ember';
import randomWait from '../../utils/random-wait';
import { BUILDINGS } from '../../utils/sample-data';

export default Ember.Route.extend({
  model() {
    const buildingIds = Ember.get(this.modelFor('company'), 'buildings');
    return randomWait(Ember.testing ? 4 : 2400, Ember.testing ? 2 : 300).then(() => {
      return Ember.A(BUILDINGS.filter(b => buildingIds.indexOf(b.id) >= 0));
    });
  }
});