import Ember from 'ember';

const { on } = Ember;

export default Ember.Route.extend({
	actions: {
		willTransition: Ember.on('willTransition', function () {
			const t = new Date().valueOf();
			this.router.transitionStart = t; 
			console.log(`willTransition - ${this.get('routeName')} ${t}`);
		}),
		didTransition: Ember.on('didTransition', function () {
			let timeInfo = '';
			if (this.router.transitionStart) {
				const t = new Date().valueOf();
				const diff = t - this.router.transitionStart; 
				this.router.transitionStart = null;
				timeInfo = `\tTransitionTime ${t} (${diff}ms)`
			}
			console.log(`didTransition - ${this.get('routeName')} ${timeInfo}`);

		}),
	},
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