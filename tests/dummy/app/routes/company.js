import Ember from 'ember';
import BaseRoute from './base';
import randomWait from '../utils/random-wait';
import { COMPANIES } from '../utils/sample-data';

export default BaseRoute.extend({
	model(params) {
		return randomWait(3000,300).then(() => {
			return Ember.A(COMPANIES).findBy('id', parseInt(params.id, 10));
		});
	}
});