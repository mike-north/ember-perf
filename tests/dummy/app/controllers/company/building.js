import Ember from 'ember';

export default Ember.Controller.extend({
  editing: false,

  actions: {
    edit() {
      this.set('editing', true);
    }
  }
});
