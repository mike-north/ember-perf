import Ember from 'ember';

const { computed, on, Mixin } = Ember;

export default Mixin.create({

  perfService: computed(function() {
    return this.container.lookup('service:ember-perf');
  }),

  _doURLTransition() {
    const promise = this._super(...arguments);
    this.trigger('willTransition', { promise });
    return promise;
  },

  _doTransition() {
    const promise = this._super(...arguments);
    this.trigger('willTransition', { promise });
    return promise;
  },

  _beginPerfDataCollection(transitionInfo) {
    this.get('perfService').measureTransition(transitionInfo);
  },

  _transitionStartListener: on('willTransition', function(transitionInfo) {
    this._beginPerfDataCollection(transitionInfo);
  })
});
