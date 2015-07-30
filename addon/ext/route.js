import Ember from 'ember';

export function upgradeRoute(route=Ember.Route) {
  route.reopen({
    _upgradedByEmberPerf: true,
    activate() {
      this.get('perfService').routeActivated(this);
      this._super(...arguments);
    },
    deactivate() {
      this.get('perfService').routeDeactivated(this);
      this._super(...arguments);
    }
  });
}
