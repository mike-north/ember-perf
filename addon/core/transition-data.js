function TransitionData(args) {
  this.destURL = args.destURL;
  this.destRoute = args.destRoute;
  this.startTime = new Date().valueOf();
  this.endTime = null;
  this._routes = [];
  this._views = [];
}

function t() {
  return new Date().valueOf();
}

TransitionData.prototype = {

  finish() {
    this.endTime = t();
    this.elapsedTime = this.endTime - this.startTime;
  },

  activateRoute(route) {
    const startTime = t();
    const r = {
      name: route.routeName,
      debugContainerKey: route._debugContainerKey,
      startTime,
      views: []
    };
    this._routes.push(r);
    this._lastActivatedRoute = r;
  },

  deactivateRoute(/*route*/) {
    // const endTime = t();
    // const [r] = this._routes.filter(_r =>  _r.name === route.routeName);
    // debugger;
    // r.endTime = endTime;
    // r.elapsedTime = r.endTime - r.startTime;
  },

  willRender(name, timestamp, payload) {
    switch (name) {
      case 'render.component':
      case 'render.view':
        const id = payload.view.elementId;
        const startTime = t();
        const v = {
          startTime,
          id,
          containerKey: payload.view._debugContainerKey
        };
        let activeRoute = this._lastActivatedRoute;
        const viewIdx = this._views.length;
        this._views.push(v);

        if (payload.view.parentView) {
          v.parentViewId = payload.view.parentView.elementId;
        }
        activeRoute.views.push(viewIdx);
        break;
      default:
        console.log('ignoring event: ', name);
    }
  },

  didRender(name, timestamp, payload) {
    switch (name) {
      case 'render.component':
      case 'render.view':
        const id = payload.view.elementId;
        console.log('didRender - ', id);
        const [viewData] = this._views.filter(v => {
          return payload.view.elementId === v.id;
        });
        viewData.endTime = t();
        viewData.elapsedTime = viewData.endTime - viewData.startTime;
        break;
      default:
        console.log('~ignoring event: ', name);
    }
  }
};

export default TransitionData;