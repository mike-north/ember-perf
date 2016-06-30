import Ember from 'ember';
import { initialize } from '../../../initializers/ember-perf';
import { module, test } from 'qunit';

const { run, Application } = Ember;

let registry, application;

module('Unit | Initializer | ember perf', {
  beforeEach() {
    run(function() {
      application = Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', (assert) => {
  initialize(registry, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
