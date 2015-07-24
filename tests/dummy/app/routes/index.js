import Ember from 'ember';
import BaseRoute from './base';

export default BaseRoute.extend({
	redirect() {
		this.transitionTo('companies');
	}
});