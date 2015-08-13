function TransitionData() {
  this.startTime = new Date().valueOf();
  this.endTime = null;
}

function t() {
  return new Date().valueOf();
}

TransitionData.prototype = {
  _routes: [],
  _views: [],
  finish() {
    this.endTime = t();
  },

  activateRoute(name) {
    const activationTime = t();
    const r = {
      name,
      activationTime,
      views: []
    };
    this._routes.push(r);
    this._lastActivatedRoute = r;
  },

  willRender(name, timestamp, payload) {
    switch (name) {
      case 'render.component':
      case 'render.view':
        const id = payload.view.elementId;
        console.log(`willRender - ${id}`);
        const startTime = t();
        const v = {
          startTime,
          id,
          containerKey: payload.view._debugContainerKey
        };
        let activeRoute = this._lastActivatedRoute;
        this._views.push(v);
        if (payload.view.parentView) {
          v.parentViewId = payload.view.parentView.elementId;
        }
        activeRoute.views.push(v.id);

        // this._lastActivatedRoute.views.push(v);
        // console.log(this._lastActivatedRoute);
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
        break;
      default:
        console.log('~ignoring event: ', name);
    }
  }
};

export default TransitionData;