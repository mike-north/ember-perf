import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  activate() {
    this.get('perfService').routeActivated(this);
    this._super(...arguments);
  },

  renderTemplate() {
    this.get('perfService').routeWillRender(this);
    this._super(...arguments);
  }
});
