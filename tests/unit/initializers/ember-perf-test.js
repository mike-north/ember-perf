import { run } from '@ember/runloop';
import Application from '@ember/application';
import { initialize } from '../../../initializers/ember-perf';
import { module, test } from 'qunit';

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
