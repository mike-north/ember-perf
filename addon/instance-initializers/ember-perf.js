import Ember from 'ember';

// this lives in addon/ because when running on Ember < 1.12
// the ember-load-initializers project will attempt to call
// `Ember.Application#instanceInitializer` which does not exist.
//
// This was fixed upstream in https://github.com/ember-cli/ember-load-initializers/pull/21,
// but is not in widespread use yet.
export function initialize(instance) {
  // in 2.1 the ApplicationInstance instance has a public `lookup` method
  const container = instance.lookup ? instance : instance.container;

  // in 2.1 the ApplicationInstance uses `_lookupFactory` to avoid making lookupFactory public
  // along with `lookup`
  const config = container._lookupFactory ? container._lookupFactory('config:environment') : container.lookupFactory('service:ember-perf');
  const emberPerfConfig = config.emberPerfConfig || {};

  let shouldSubscribeToViewEvents = 'logViewEvents' in emberPerfConfig ? emberPerfConfig.logViewEvents : true;

  if (shouldSubscribeToViewEvents) {
    const emberPerf = container.lookup('service:ember-perf');

    Ember.subscribe('render', {
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
