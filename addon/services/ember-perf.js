import Ember from 'ember';
import TransitionData from '../core/transition-data';

const { on, Evented, assert, String: { classify }, computed: { oneWay } } = Ember;
const Base = Ember.Service || Ember.Object;
const { keys } = Object;

export default Base.extend(Evented, {
  transitionData: null,

  debugMode: oneWay('defaultDebugMode'),

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
    this.transitionData = new TransitionData({
      destURL: transitionInfo.promise.intent.url,
      destRoute: transitionInfo.promise.targetName
    });
    transitionInfo.promise.then(() => {
      this.transitionData.finish();
      const event = this.transitionData;
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
    this.transitionData.activateRoute(route);
    this.debugLog(`route activated - ${route.get('routeName')}`);
  },

  /**
   * Hook that's called whenever a route is deactivated
   * @param  {Ember.Route} route
   * @public
   */
  routeDeactivated(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    this.transitionData.deactivateRoute(route);
    this.debugLog(`route deactivated - ${route.get('routeName')}`);
  },

  /**
   * Hook that's called before a view starts rendering
   * @param  {String} name      The name of the view that's about to render
   * @param  {int}    timestamp The time at which this event was fired
   * @param  {Object} payload   More information about the view/template
   * @public
   */
  renderBefore(name, timestamp, payload) {
    assert('Expected non-empty transitionData', this.transitionData);
    this.transitionData.willRender(name, timestamp, payload);
    this.debugLog(`view will render - ${(payload.view || {})._debugContainerKey}`);
  },

  renderAfter(name, timestamp, payload) {
    assert('Expected non-empty transitionData', this.transitionData);
    this.transitionData.didRender(name, timestamp, payload);
    this.debugLog(`view did render - ${(payload.view || {})._debugContainerKey}`);
  },

  transitionLogger: on('transitionComplete', function(data) {
    console.group(`Top-Level Transition to ${data.destRoute} (${data.destURL}): ${data.elapsedTime}ms`);
    for (let i = 0; i < data._routes.length; i++) {
      console.group(`${data._routes[i].name} ${data._routes[i].elapsedTime}ms`);
      for (let j = 0; j < (data._routes[i].views || []).length; j++) {
        const v = data._views[data._routes[i].views[j]];
        console.group(`${v.containerKey} (${v.id}): ${v.elapsedTime}ms`);
        console.groupEnd();
      }
      console.groupEnd();
    }
    console.groupEnd();
  })
});
