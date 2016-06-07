import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

let application;

module('Acceptance | companies', {
  beforeEach() {
    application = startApp();
  },

  afterEach() {
    Ember.run(application, 'destroy');
  }
});

test('Basic demo page test', function(assert) {
  visit('/companies');

  andThen(function() {
    assert.equal(currentURL(), '/companies');
    assert.equal(find('.companies-list li').length, 3, 'One company in list');
    assert.equal(find('.companies-list .company:first-child').text().trim(), 'Yahoo', 'Yahoo is first company');
  });

  click('.companies-list .company:first-child a');

  andThen(function() {
    assert.equal(currentURL(), '/company/1/buildings');
  });
});
