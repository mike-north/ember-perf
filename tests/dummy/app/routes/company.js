import Ember from 'ember';
import BaseRoute from './base';
import randomWait from '../utils/random-wait';
import { COMPANIES } from '../utils/sample-data';

const { A, testing } = Ember;

export default BaseRoute.extend({
  model(params) {
    return randomWait(testing ? 4 : 3000, testing ? 2 : 300).then(() => {
      let company = new A(COMPANIES).findBy('id', parseInt(params.id, 10));
      company.buildingIds = new A(company.buildings.map((b) => {
        return { id: b, name: `Building (${b})` };
      }));
      return company;
    });
  }
});
