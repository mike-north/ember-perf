import Ember from 'ember';

const { computed, on, Mixin } = Ember;

export default Mixin.create({

  perfService: computed(function() {
    return this.container.lookup('service:ember-perf');
  }),

  _doURLTransition() {
    const promise = this._super(...arguments);
    this.trigger('_emberPerfWillTransition', { promise });
    return promise;
  },

  _doTransition() {
    const promise = this._super(...arguments);
    this.trigger('_emberPerfWillTransition', { promise });
    return promise;
  },

  _beginPerfDataCollection(transitionInfo) {
    this.get('perfService')._measureTransition(transitionInfo);
  },

  _transitionStartListener: on('_emberPerfWillTransition', function(transitionInfo) {
    const existingTransitionData = this.get("perfService").transitionData;
    if (!existingTransitionData || transitionInfo.promise.targetName !== existingTransitionData.destRoute) {
      this._beginPerfDataCollection(transitionInfo);
    }
  })
});
