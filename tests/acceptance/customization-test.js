import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

let application;

module('Acceptance | drilling in', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('Drilling in', function(assert) {
  visit('/company/1/buildings');

  andThen(function() {
    assert.equal(currentURL(), '/company/1/buildings');
  });

});
