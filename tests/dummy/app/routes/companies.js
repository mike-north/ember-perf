import { A } from '@ember/array';
import Ember from 'ember';
import randomWait from '../utils/random-wait';
import { COMPANIES } from '../utils/sample-data';
import BaseRoute from './base';

const {
  testing
} = Ember;

export default BaseRoute.extend({
  model() {
    return randomWait(testing ? 4 : 3000, testing ? 2 : 300).then(() => {
      return A(COMPANIES);
    });
  }
});
