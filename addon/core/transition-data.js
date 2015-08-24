function TransitionData(args) {
  this.destURL = args.destURL;
  this.destRoute = args.destRoute;
  this.startTime = new Date().valueOf();
  this.endTime = null;
  this.routes = [];
  this.viewData = [];
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
    this.routes.push(r);
    this._lastActivatedRoute = r;
  },

  routeFinishedSetup(route) {
    const endTime = t();
    const [r] = this.routes.filter(_r =>  _r.name === route.routeName);
    r.endTime = endTime;
    r.elapsedTime = r.endTime - r.startTime;
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
        const viewIdx = this.viewData.length;
        this.viewData.push(v);

        if (payload.view.parentView) {
          v.parentViewId = payload.view.parentView.elementId;
        }
        activeRoute.views.push(viewIdx);
        break;
    }
  },

  didRender(name, timestamp, payload) {
    switch (name) {
      case 'render.component':
      case 'render.view':
        const id = payload.view.elementId;
        console.log('didRender - ', id);
        const [viewData] = this.viewData.filter(v => {
          return payload.view.elementId === v.id;
        });
        viewData.endTime = t();
        viewData.elapsedTime = viewData.endTime - viewData.startTime;
        break;
    }
  }
};

export default TransitionData;