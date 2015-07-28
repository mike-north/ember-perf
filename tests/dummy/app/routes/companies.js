import Ember from 'ember';
import randomWait from '../utils/random-wait';
import { COMPANIES } from '../utils/sample-data';
import BaseRoute from './base';

export default BaseRoute.extend({
  model() {
    return randomWait(Ember.testing ? 10 : 3000, Ember.testing ? 10 : 300).then(() => {
      return Ember.A(COMPANIES);
    });
  }
});
