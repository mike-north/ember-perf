import Mixin from '@ember/object/mixin';

export default Mixin.create({
  setupController() {
    this.get('perfService').routeActivated(this);
    this._super(...arguments);
  },

  renderTemplate() {
    this.get('perfService').routeWillRender(this);
    this._super(...arguments);
  }
});
