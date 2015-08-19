import Ember from 'ember';
import randomWait from '../utils/random-wait';
import { COMPANIES } from '../utils/sample-data';
import BaseRoute from './base';

export default BaseRoute.extend({
  model() {
    return randomWait(Ember.testing ? 4 : 3000, Ember.testing ? 2 : 300).then(() => {
      return Ember.A(COMPANIES);
    });
  }
});
