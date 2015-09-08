import config from '../config/environment';

export function initialize(instance) {
  const {
    emberPerf
  } = config;

  let shouldSubscribeToViewEvents = 'logViewEvents' in emberPerf ? emberPerf.logViewEvents : true;

  if (shouldSubscribeToViewEvents) {
    const emberPerf = instance.lookup ? instance.lookup('service:ember-perf') : instance.container.lookup('service:ember-perf');

    Ember.subscribe("render", {
      before(name, timestamp, payload) {
        emberPerf.renderBefore(name, timestamp, payload);
      },
      after(name, timestamp, payload) {
        emberPerf.renderAfter(name, timestamp, payload);
      }
    });
  }
};

export default {
  name: 'ember-perf-instance-setup',
  initialize: initialize
};
