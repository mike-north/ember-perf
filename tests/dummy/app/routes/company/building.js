import Ember from 'ember';
import randomWait from '../../utils/random-wait';
import { BUILDINGS } from '../../utils/sample-data';

const { Route, get, testing } = Ember;

export default Route.extend({
  model(params) {
    let buildingIds = get(this.modelFor('company'), 'buildings');
    // jscs: disable
    if (buildingIds.indexOf(parseInt(params.building_id, 10)) < 0) {
      return null;
    } else {
      return randomWait(testing ? 4 : 2400, testing ? 2 : 300).then(() => {
        return BUILDINGS.filter(b => `${b.id}` === params.building_id )[0];
      });
    }
    // jscs: enable
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('editing', false);
  }
});
