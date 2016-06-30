import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

const { run } = Ember;

let application;

module('Acceptance | perf event firing scenarios', {
  beforeEach() {
    application = startApp();
    application.perfService = application.__container__.lookup('service:ember-perf');
  },

  afterEach() {
    run(application, 'destroy');
    application = null;
  }
});

test('Initial load, then drilling in', function(assert) {
  let dataCount = 0;
  application.perfService.on('transitionComplete', () => {
    dataCount++;
  });

  visit('/company/1/buildings');

  andThen(function() {
    assert.equal(dataCount, 1, 'Only one event has been fired for the initial load');
    assert.equal(currentURL(), '/company/1/buildings');
  });

  click('ul.buildings-list .building-id:first-child a');

  andThen(function() {
    assert.equal(dataCount, 2, 'Only one event has been fired for a drill-in');
  });

});

test('Initial load, then pivoting on a parent', function(assert) {
  let dataCount = 0;

  application.perfService.on('transitionComplete', () => {
    dataCount++;
  });

  visit('/company/1/building/2');

  andThen(function() {
    assert.equal(dataCount, 1, 'Only one event has been fired for the initial load');
    assert.equal(currentURL(), '/company/1/building/2');
  });

  click('ul.buildings-list .building-id:first-child a');

  andThen(function() {
    assert.equal(currentURL(), '/company/1/building/1');
    assert.equal(dataCount, 2, 'Only one event has been fired for a pivot');
  });

});

test('Initial load, then toggling additional views', function(assert) {
  let transitionData;
  let dataCount = 0;
  let viewsCountWhenEventFired = 0;
  application.perfService.on('transitionComplete', (data) => {
    dataCount++;
    transitionData = data;
    viewsCountWhenEventFired = data.viewData.length;
  });

  visit('/company/1/building/2');

  andThen(function() {
    assert.equal(dataCount, 1, 'Only one event has been fired for the initial load');
    assert.equal(currentURL(), '/company/1/building/2');
  });

  click('.btn-edit');

  andThen(function() {
    assert.equal(dataCount, 1, 'only a single transitionComplete event was fired');
    assert.equal(transitionData.viewData.length, viewsCountWhenEventFired, 'transitionData should not be mutated');
  });
});
