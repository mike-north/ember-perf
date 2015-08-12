import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  activate() {
    this.get('perfService').routeActivated(this);
    this._super(...arguments);
  },
  deactivate() {
    this.get('perfService').routeDeactivated(this);
    this._super(...arguments);
  }
});