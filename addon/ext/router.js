import { computed } from '@ember/object';
import { on } from '@ember/object/evented';
import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';

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
    this._beginPerfDataCollection(transitionInfo);
  })
});
