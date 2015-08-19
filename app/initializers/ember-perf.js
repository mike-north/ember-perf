import EmberPerfService from 'ember-perf/services/ember-perf';
import RouterExt from 'ember-perf/ext/router';
import RouteExt from 'ember-perf/ext/route';
import config from '../config/environment';

const {
  Router, Route
} = Ember;

function injectServiceOntoFactories(emberPerf, container, application) {
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

export function initialize(container, application) {
  const {
    emberPerf
  } = config;
  
  injectServiceOntoFactories(emberPerf, container, application);

  Route.reopen(RouteExt);
  Router.reopen(RouterExt);

  Ember.subscribe("render", {
    before(name, timestamp, payload) {
      container.lookup('service:ember-perf').renderBefore(name, timestamp, payload);
    },
    after(name, timestamp, payload) {
      container.lookup('service:ember-perf').renderAfter(name, timestamp, payload);
    }
  });

};

export default {
  name: 'ember-perf',
  initialize: initialize
};