import Ember from 'ember';
import randomWait from '../../utils/random-wait';
import { BUILDINGS } from '../../utils/sample-data';

const { Route, testing, get, A } = Ember;

export default Route.extend({
  model() {
    let buildingIds = get(this.modelFor('company'), 'buildings');
    return randomWait(testing ? 4 : 2400, testing ? 2 : 300).then(() => {
      return A(BUILDINGS.filter((b) => buildingIds.indexOf(b.id) >= 0));
    });
  }
});
