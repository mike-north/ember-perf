import Ember from 'ember';
import { initialize } from '../../../initializers/ember-perf';
import { module, test } from 'qunit';

let registry, application;

module('Unit | Initializer | ember perf', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', assert => {
  initialize(registry, application);
  assert.ok('Route is upgraded', Ember.Route.create()._upgradedByEmberPerf);
  assert.ok('Route is upgraded', Ember.Router.create()._upgradedByEmberPerf);
  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
