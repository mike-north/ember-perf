import Ember from 'ember';
import randomWait from '../../utils/random-wait';
import { BUILDINGS } from '../../utils/sample-data';

export default Ember.Route.extend({
  model(params) {
    const buildingIds = Ember.get(this.modelFor('company'), 'buildings');
    // jscs: disable
    if (buildingIds.indexOf(parseInt(params.building_id, 10)) < 0) {
      return null;
    } else {
      return randomWait(Ember.testing ? 4 : 2400, Ember.testing ? 2 : 300).then(() => {
        return BUILDINGS.filter(b => `${b.id}` === params.building_id )[0];
      });
    }
    // jscs: enable
  }
});