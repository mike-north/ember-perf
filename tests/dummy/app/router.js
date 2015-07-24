import Ember from 'ember';
import config from './config/environment';

const { on } = Ember;

var Router = Ember.Router.extend({
  location: config.locationType,
  transitionTo() {
  	const tsNow = window.performance.now();
  	console.log('transition started', tsNow);
  	const transitionPromise = this._super(...arguments);
  	transitionPromise.then(() => {
  		const tsDone = window.performance.now();
  		console.log('transition ended', tsDone, `${(tsDone - tsNow)/1000}s`);
  	})
  	return transitionPromise;
  }
});

Router.reopen({
  _doURLTransition() {
    debugger;
    return this._super(...arguments);
  },

  _doTransition() {
    debugger;
    return this._super(...arguments);
  }
});

Router.map(function() {
	this.route('companies');
	this.route('company', {path: 'company/:id'}, function () {
		this.route('buildings');
		this.route('building', {path: 'building/:id'}, function () {
			this.route('floors');
			this.route('floor', {path: 'floor/:id'});
		});
	});
});


export default Router;
