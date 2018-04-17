import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { A } from '@ember/array';
import Ember from 'ember';
import randomWait from '../../utils/random-wait';
import { BUILDINGS } from '../../utils/sample-data';

const {
  testing
} = Ember;

export default Route.extend({
  queryParams: {
    uselessQP: {
      refreshModel: true
    }
  },

  model() {
    let buildingIds = get(this.modelFor('company'), 'buildings');
    return randomWait(testing ? 4 : 2400, testing ? 2 : 300).then(() => {
      return A(BUILDINGS.filter((b) => buildingIds.indexOf(b.id) >= 0));
    });
  }
});
