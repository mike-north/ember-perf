import Ember from 'ember';

const { log } = Ember.Logger;

export function initialize() {
    // Handle 1.12.x case, where signature is
    //  initialize(instance) {...}
    const instance = arguments[1] || arguments[0];
    const container = !!arguments[1] ? arguments[0] : instance.container;

    let perfService = container.lookup('service:ember-perf');

    perfService.on('transitionComplete', transitionData => {
      log('transitionComplete', transitionData);
      // DO SOMETHING WITH TRANSITION DATA
    });

    perfService.on('renderComplete', transitionData => {
      log('renderComplete', transitionData);
      // DO SOMETHING WITH RENDER DATA
    });

}

export default {
  name: '<%= dasherizedModuleName %>-instance',
  initialize
};
