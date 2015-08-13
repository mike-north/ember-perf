import Ember from 'ember';

const { on, Evented, assert, String: { classify }, computed: { defaultTo } } = Ember;
const Base = Ember.Service || Ember.Object;
const { keys } = Object;

export default Base.extend(Evented, {
  transitionData: null,

  debugMode: defaultTo('defaultDebugMode'),

  debugLog() {
    if (this.get('debugMode')) {
      console.log(...arguments);
    }
  },

  init() {
    this._super(...arguments);
    this._setDefaults();
  },

  _setDefaults() {
    const defaults = Ember.getWithDefault(this, 'defaults', {});
    keys(defaults).map(key => {
      const classifiedKey = classify(key);
      const defaultKey = `default${classifiedKey}`;
      return Ember.set(this, defaultKey, defaults[key]);
    });
  },


  /**
   * Measure a transition (promise)
   * @param  {Promise} transitionInfo - promise associated with the transition
   * @private
   */
  _measureTransition(transitionInfo) {
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

  /**
   * Hook that's called whenever a route is activated
   * @param  {Ember.Route} route
   * @public
   */
  routeActivated(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    if (!this.transitionData.routes) {
      this.transitionData.routes = Ember.A();
    }
    this.transitionData.routes.addObject({ name: route.routeName });
    this.debugLog(`route activated - ${route.get('routeName')}`);
  },

  /**
   * Hook that's called whenever a route is deactivated
   * @param  {Ember.Route} route
   * @public
   */
  routeDeactivated(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    if (!this.transitionData.routes) {
      this.transitionData.routes = Ember.A();
    }
    const routeObj = this.transitionData.routes.findBy('name', route.routeName);
    this.transitionData.routes.removeObject(routeObj);
    this.debugLog(`route deactivated - ${route.get('routeName')}`);
  },

  currentLoadingRoute() {
    assert('Expected non-empty transitionData', this.transitionData);
    let meaningfulRoutes = this.transitionData.routes.filter(routeName => routeName !== 'loading');
    return meaningfulRoutes[meaningfulRoutes.length - 1];
  },

  /**
   * Hook that's called before a view starts rendering
   * @param  {String} name      The name of the view that's about to render
   * @param  {int}    timestamp The time at which this event was fired
   * @param  {Object} payload   More information about the view/template
   * @public
   */
  renderBefore(name, timestamp, payload) {
    const route = this.currentLoadingRoute();
    if (!route.views) {
      route.views = Ember.A();
    }
    if (!payload.view) {
      return;
    }
    route.views.addObject({
      object: payload.object,
      viewId: payload.view.elementId,
      containerKey: payload.view._debugContainerKey,
      startTime: timestamp
    });
  },

  /**
   * Hook that's called after a view finishes rendering
   * @param  {String} name      The name of the view that just rendered
   * @param  {int}    timestamp The time at which this event was fired
   * @param  {Object} payload   More information about the view/template
   * @public
   */
  renderAfter(name, timestamp, payload) {
    const route = this.currentLoadingRoute();
    const viewObject = route.views.findBy('object', payload.object);
    if (!viewObject) {
      return;
    }
    viewObject.endTime = timestamp;
    viewObject.renderTime = viewObject.endTime - viewObject.startTime;
  },

  transitionLogger: on('transitionComplete', function(data) {
    this.debugLog('DATA', data);
    this.debugLog(`Transition complete ${data.elapsedTime}ms`);
  })
});
