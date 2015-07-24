import Ember from 'ember';

export default Ember.Route.extend({
	activate() {
		console.log(`activate - ${this.get('routeName')}`);
		this._super(...arguments);
	},
	beforeModel() {
		console.log(`beforeModel - ${this.get('routeName')}`);
		this._super(...arguments);
	},
	afterModel() {
		console.log(`afterModel - ${this.get('routeName')}`);
		this._super(...arguments);
	}
});