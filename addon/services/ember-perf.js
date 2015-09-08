import Ember from 'ember';
import TransitionData from '../core/transition-data';
import RenderData from '../core/render-data';

const { Evented, assert, String: { classify }, computed: { oneWay }, RSVP: { defer } } = Ember;
const Base = Ember.Service || Ember.Object;
const { keys } = Object;

let transitionCounter = 0;

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
    if (transitionInfo.promise._emberPerfTransitionId) {
      return;
    }
    transitionInfo.promise._emberPerfTransitionId = transitionCounter++;
    let transitionRoute = transitionInfo.promise.targetName || Ember.get(transitionInfo.promise, 'intent.name');
    let transitionCtxt = Ember.get(transitionInfo.promise, 'intent.contexts') ? (Ember.get(transitionInfo.promise, 'intent.contexts') || [])[0] : null;
    let transitionUrl = Ember.get(transitionInfo.promise, 'intent.url');
    Ember.assert('Must have at least a route name', transitionRoute);

    if (!transitionUrl) {
      if (transitionCtxt) {
        transitionUrl = transitionInfo.promise.router.generate(transitionRoute, transitionCtxt);
      } else {
        transitionUrl = transitionInfo.promise.router.generate(transitionRoute);
      }
    }
    this.renderData = this.transitionData = new TransitionData({
      destURL: transitionUrl,
      destRoute: transitionRoute
    });
    transitionInfo.promise.then(() => {
      this.transitionData.finish();
      const event = this.transitionData;
      Ember.run.scheduleOnce('afterRender', () => {
        this.trigger('transitionComplete', event);
      });
    });
  },

  /**
   * Method to be called to measure one full pass of rendering.
   *
   * @returns {Promise} Returns a promise that resolves with the render data.
   * @public
   */
  measureRender() {
    this.transitionData = null;

    let deferred = defer(`measureRender`);

    this.renderData = new RenderData();

    Ember.run.schedule('afterRender', () => {
      const event = this.renderData;
      event.finish();

      this.trigger('renderComplete', event);
      deferred.resolve(event);
    });

    return deferred.promise;
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
   * Hook that's called whenever a route is beginning to render (after all setup has completed).
   * @param  {Ember.Route} route
   * @public
   */
  routeWillRender(route) {
    assert('Expected non-empty transitionData', this.transitionData);
    this.transitionData.routeFinishedSetup(route);
    this.debugLog(`route will render - ${route.get('routeName')}`);
  },

  /**
   * Hook that's called before a view starts rendering
   * @param  {String} name      The name of the view that's about to render
   * @param  {int}    timestamp The time at which this event was fired
   * @param  {Object} payload   More information about the view/template
   * @public
   */
  renderBefore(name, timestamp, payload) {
    assert('Expected non-empty renderData', this.renderData);
    this.renderData.willRender(name, timestamp, payload);
    this.debugLog(`view will render - ${(payload.view || {})._debugContainerKey}`);
  },

  renderAfter(name, timestamp, payload) {
    assert('Expected non-empty renderData', this.renderData);
    this.renderData.didRender(name, timestamp, payload);
    this.debugLog(`view did render - ${(payload.view || {})._debugContainerKey}`);
  },

  transitionLogger: Ember.on('transitionComplete', function(data) {
    if (this.get('debugMode')) {
      console.group(`Top-Level Transition to ${data.destRoute} (${data.destURL}): ${data.elapsedTime}ms`);
      for (let i = 0; i < data.routes.length; i++) {
        console.group(`${data.routes[i].name} ${data.routes[i].elapsedTime}ms`);
        if (data.routes[i].views) {
          for (let j = 0; j < (data.routes[i].views || []).length; j++) {
            const v = data.viewData[data.routes[i].views[j]];
            console.log(`${v.containerKey} (${v.id}): ${v.elapsedTime}ms`);
          }
        }
        console.groupEnd();
      }
      console.groupEnd();
    }
  }),

  renderLogger: Ember.on('renderComplete', function(data) {
    if (this.get('debugMode')) {
      console.group(`Render Completed: ${data.elapsedTime}ms`);
      for (let i = 0; i < data.viewData.length; i++) {
        const v = data.viewData[i];
        console.log(`${v.containerKey} (${v.id}): ${v.elapsedTime}ms`);
      }
      console.groupEnd();
    }
  })
});
