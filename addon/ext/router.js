import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

const { computed, on, Mixin } = Ember;

export default Mixin.create({

  perfService: computed(function() {
    return getOwner(this).lookup('service:ember-perf');
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
    this._beginPerfDataCollection(transitionInfo);
  })
});
