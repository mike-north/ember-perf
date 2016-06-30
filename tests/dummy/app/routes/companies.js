import Ember from 'ember';
import randomWait from '../utils/random-wait';
import { COMPANIES } from '../utils/sample-data';
import BaseRoute from './base';

const { A, testing } = Ember;

export default BaseRoute.extend({
  model() {
    return randomWait(testing ? 4 : 3000, testing ? 2 : 300).then(() => {
      return A(COMPANIES);
    });
  }
});
