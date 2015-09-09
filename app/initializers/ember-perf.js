import Ember from 'ember';
import EmberPerfService from 'ember-perf/services/ember-perf';
import RouterExt from 'ember-perf/ext/router';
import RouteExt from 'ember-perf/ext/route';
import config from '../config/environment';
import instanceInitializer from 'ember-perf/instance-initializers/ember-perf';

const {
  Router, Route
} = Ember;

if (Ember.Application.instanceInitializer) {
  Ember.Application.instanceInitializer(instanceInitializer);
}

function injectServiceOntoFactories(emberPerf, application) {
  const {
    injectionFactories
  } = emberPerf;

  application.register('config:ember-perf', emberPerf, {
    instantiate: false
  });
  application.register('service:ember-perf', EmberPerfService);
  application.inject('service:ember-perf', 'defaults', 'config:ember-perf');

  injectionFactories.forEach(factory => {
    application.inject(factory, 'perfService', 'service:ember-perf');
  });
}

export function initialize() {
  const application = arguments[1] || arguments[0];
  const container = application.__container__;

  const {
    emberPerf
  } = config;

  injectServiceOntoFactories(emberPerf, application);

  Route.reopen(RouteExt);
  Router.reopen(RouterExt);

  // instance initializers were available as of Ember 1.12, this
  // runs the instance initializer manually if needed
  if (!application.instanceInitializer) {
    instanceInitializer.initialize(container);
  }
};

export default {
  name: 'ember-perf-setup',
  initialize: initialize
};
