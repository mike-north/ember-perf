import EmberPerfService from 'ember-perf/services/ember-perf';
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

  Route.reopen({
    activate() {
      this.get('perfService').routeActivated(this);
      this._super(...arguments);
    },
    deactivate() {
      this.get('perfService').routeDeactivated(this);
      this._super(...arguments);
    // },
    // beforeModel() {
    //   console.log(`beforeModel - ${this.get('routeName')}`);
    //   this._super(...arguments);
    // },
    // afterModel() {
    //   console.log(`afterModel - ${this.get('routeName')}`);
    //   this._super(...arguments);
    }
  });


  Router.reopen({
    perfService: computed(function() {
      return this.container.lookup('service:ember-perf');
    }),
    _doURLTransition() {
      const transitionPromise = this._super(...arguments);
      this.trigger('willTransition', {
        promise: transitionPromise
      });
      return transitionPromise;
    },
    _doTransition() {
      const transitionPromise = this._super(...arguments);
      this.trigger('willTransition', {
        promise: transitionPromise
      });
      return transitionPromise;
    },

    _beginPerfDataCollection(transitionInfo) {
      this.get('perfService').measureTransition(transitionInfo);
    },

    _transitionStartListener: on('willTransition', function(transitionInfo) {
      this._beginPerfDataCollection(transitionInfo);
    })
  });

}

export function initialize(container, application) {
  const {
    emberPerf
  } = config;
  injectServiceOntoFactories(emberPerf, container, application);
  installInstrumentationHooks();

};

export default {
  name: 'ember-perf',
  initialize: initialize
};