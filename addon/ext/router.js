import Ember from 'ember';

const { computed, on, Mixin, getOwner } = Ember;

export default Mixin.create({

  perfService: computed(function() {
    return getOwner(this).lookup('service:ember-perf');
  }),

  _doURLTransition() {
    let promise = this._super(...arguments);
    this.trigger('_emberPerfWillTransition', { promise });
    return promise;
  },

  _doTransition() {
    let promise = this._super(...arguments);
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
