import EmberPerfService from 'ember-perf/services/ember-perf';
import { upgradeRoute } from 'ember-perf/ext/route';
import { upgradeRouter } from 'ember-perf/ext/router';
import config from '../config/environment';

const {
  computed, on, Router, Route
} = Ember;

function injectServiceOntoFactories(emberPerf, container, application) {
  const {
    injectionFactories
  } = emberPerf;

  application.register('config:ember-perf', emberPerf, {
    instantiate: false
  });
  application.register('service:ember-perf', EmberPerfService);
  injectionFactories.forEach(factory => {
    application.inject(factory, 'perfService', 'service:ember-perf');
  });
}

function installInstrumentationHooks() {
  upgradeRoute(Route);
  upgradeRouter(Router);
}

export function initialize(container, application) {
  const {
    emberPerf
  } = config;
  injectServiceOntoFactories(emberPerf, container, application);
  installInstrumentationHooks();

  let _perfService = null
  function perfService() {
    if (!_perfService) {
      _perfService = container.lookup('service:ember-perf');
    }
    return _perfService;
  }

  Ember.subscribe("render", {
    before: function(name, timestamp, payload) {
      perfService().renderBefore(name, timestamp, payload);
    },
    after: function(name, timestamp, payload) {
      perfService().renderAfter(name, timestamp, payload);
    }
  });

};

export default {
  name: 'ember-perf',
  initialize: initialize
};
