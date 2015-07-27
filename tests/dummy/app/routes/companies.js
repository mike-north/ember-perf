import Ember from 'ember';
import randomWait from '../utils/random-wait';
import { COMPANIES } from '../utils/sample-data';
import BaseRoute from './base';

export default BaseRoute.extend({
  model() {
    return randomWait(3000, 300).then(() => {
      return Ember.A(COMPANIES);
    });
  }
});
