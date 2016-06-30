import Ember from 'ember';

const { inject, Controller } = Ember;

export default Controller.extend({
  emberPerf: inject.service(),

  editing: false,

  actions: {
    edit() {
      let emberPerf = this.get('emberPerf');

      emberPerf.measureRender();

      this.set('editing', true);
    }
  }
});
