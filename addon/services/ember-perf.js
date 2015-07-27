import Ember from 'ember';

const { on, Evented, assert } = Ember;
const Base = Ember.Service || Ember.Object;

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
      // this.transitionData = null;
      this.trigger('transitionComplete', event);
    });
  },

  routeActivated(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    if (!this.transitionData.routes) {
      this.transitionData.routes = Ember.A();
    }
    this.transitionData.routes.addObject({ name: route.routeName });
    console.log(`activate - ${route.get('routeName')}`);
  },
  routeDeactivated(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    if (!this.transitionData.routes) {
      this.transitionData.routes = Ember.A();
    }
    const routeObj = this.transitionData.routes.findBy('name', route.routeName);
    this.transitionData.routes.removeObject(routeObj);
    console.log(`deactivate - ${route.get('routeName')}`);
  },

  currentLoadingRoute() {
    assert('Expected non-empty transitionData', this.transitionData);
    let meaningfulRoutes = this.transitionData.routes.filter(routeName => routeName !== 'loading');
    return meaningfulRoutes[meaningfulRoutes.length - 1];
  },

  renderBefore(name, timestamp, payload) {
    const route = this.currentLoadingRoute();
    if (!route.views) {
      route.views = Ember.A();
    }
    route.views.addObject({
      object: payload.object,
      name: payload.view.renderedName,
      startTime: timestamp
    });
  },
  renderAfter(name, timestamp, payload) {
    const route = this.currentLoadingRoute();
    const viewObject = route.views.findBy('object', payload.object);
    viewObject.endTime = timestamp;
    viewObject.renderTime = viewObject.endTime - viewObject.startTime;
  },
  transitionLogger: on('transitionComplete', data => {
    console.log('DATA', data);
    console.log(`Transition complete ${data.elapsedTime}ms`);
  })
});
