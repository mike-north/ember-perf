import Ember from 'ember';
const { computed, on } = Ember;

export function upgradeRouter(router=Ember.Router) {
  router.reopen({
    _upgradedByEmberPerf: true,
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
