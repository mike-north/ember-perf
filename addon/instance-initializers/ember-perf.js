import Ember from 'ember';

const { subscribe } = Ember;

// this lives in addon/ because when running on Ember < 1.12
// the ember-load-initializers project will attempt to call
// `Ember.Application#instanceInitializer` which does not exist.
//
// This was fixed upstream in https://github.com/ember-cli/ember-load-initializers/pull/21,
// but is not in widespread use yet.
export function initialize(instance) {
  // in 2.1 the ApplicationInstance instance has a public `lookup` method
  let container = instance.lookup ? instance : instance.container;

  // in 2.1 the ApplicationInstance uses `_lookupFactory` to avoid making lookupFactory public
  // along with `lookup`
  let config = container._lookupFactory ? container._lookupFactory('config:environment') : container.lookupFactory('service:ember-perf');
  let emberPerfConfig = config.emberPerfConfig || {};

  let shouldSubscribeToViewEvents = 'logViewEvents' in emberPerfConfig ? emberPerfConfig.logViewEvents : true;

  if (shouldSubscribeToViewEvents) {
    let emberPerf = container.lookup('service:ember-perf');

    subscribe('render', {
      before(name, timestamp, payload) {
        emberPerf.renderBefore(name, timestamp, payload);
      },
      after(name, timestamp, payload) {
        emberPerf.renderAfter(name, timestamp, payload);
      }
    });
  }
}

export default {
  name: 'ember-perf-instance-setup',
  initialize
};
