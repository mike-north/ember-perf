import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  emberPerf: service(),

  editing: false,

  actions: {
    edit() {
      let emberPerf = this.get('emberPerf');

      emberPerf.measureRender();

      this.set('editing', true);
    }
  }
});
