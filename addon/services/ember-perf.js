import Ember from 'ember';

const { on, Evented, assert } = Ember;
const Base = Ember.Service || Ember.Object

export default Base.extend(Evented, {
  transitionData: null,
  measureTransition(transitionInfo) {
    let t = new Date().valueOf();
    this.transitionData = {
      startTime: t
    };
    transitionInfo.promise.then(() => {
      let tEnd = new Date().valueOf();
      const event = Ember.$.extend(this.transitionData, {
        endTime: tEnd,
        elapsedTime: tEnd - this.transitionData.startTime
      });
      this.transitionData = null;
      this.trigger('transitionComplete', event);
    });
  },

  routeActivated(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    if (!this.transitionData.loadedRoutes) {
      this.transitionData.loadedRoutes = Ember.A();
    }
    this.transitionData.loadedRoutes.addObject(route.routeName);
    console.log(`activate - ${route.get('routeName')}`);
  },
  routeDeactivated(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    if (!this.transitionData.loadedRoutes) {
      this.transitionData.loadedRoutes = Ember.A();
    }
    this.transitionData.loadedRoutes.removeObject(route.routeName);
    console.log(`deactivate - ${route.get('routeName')}`);
  },
  transitionLogger: on('transitionComplete', data => {
    console.log('DATA', data);
    console.log(`Transition complete ${data.elapsedTime}ms`);
  })
});
