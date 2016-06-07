import Ember from 'ember';

export default Ember.Controller.extend({
  emberPerf: Ember.inject.service(),

  editing: false,

  actions: {
    edit() {
      let emberPerf = this.get('emberPerf');

      emberPerf.measureRender();

      this.set('editing', true);
    }
  }
});
