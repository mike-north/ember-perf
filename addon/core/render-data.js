/* eslint no-case-declarations: 0 */
import performanceNow from '../utils/performance-now';

function RenderData() {
  this.startTime = performanceNow();
  this._active = true;
  this.endTime = null;
  this.viewData = [];
}

function t() {
  return performanceNow();
}

RenderData.prototype = {

  finish() {
    this.endTime = t();
    this.elapsedTime = this.endTime - this.startTime;
    this._active = false;
  },

  _viewAdded(/* view, index */) { },

  willRender(name, timestamp, payload) {
    if (!this._active) {
      return;
    }

    switch (name) {
      case 'render.component':
      case 'render.view':
        let id = payload.view.elementId;
        let startTime = t();
        let v = {
          startTime,
          id,
          containerKey: payload.view._debugContainerKey
        };
        let viewIdx = this.viewData.length;
        this.viewData.push(v);

        if (payload.view.parentView) {
          v.parentViewId = payload.view.parentView.elementId;
        }

        this._viewAdded(v, viewIdx);
        break;
    }
  },

  didRender(name, timestamp, payload) {
    if (!this._active) {
      return;
    }

    switch (name) {
      case 'render.component':
      case 'render.view':
        let [viewData] = this.viewData.filter((v) => {
          return payload.view.elementId === v.id;
        });
        viewData.endTime = t();
        viewData.elapsedTime = viewData.endTime - viewData.startTime;
        break;
    }
  }
};

export default RenderData;
