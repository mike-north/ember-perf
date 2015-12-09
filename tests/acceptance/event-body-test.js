import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';
import validateEvent from '../../tests/helpers/validate-event';
import performanceNow from 'ember-perf/utils/performance-now';

let application;

module('Acceptance | event data structure', {
  beforeEach() {
    application = startApp();
    application.perfService = application.__container__.lookup('service:ember-perf');
  },

  afterEach() {
    Ember.run(application, 'destroy');
    application = null;
  }
});

test('Initial load, then drilling in', function(assert) {
  let datas = [];
  let testStartTime = performanceNow();

  application.perfService.on('transitionComplete', (data) => {
    datas.push(data);
  });

  visit('/company/1/buildings');

  andThen(function() {
    assert.ok(datas, 'Data is present');
    let [data] = datas;

    assert.equal(data.destURL, '/company/1/buildings', 'Intent URL is correct');
    assert.equal(data.destRoute, 'company.buildings', 'Intent route is correct');

    validateEvent(assert, testStartTime, data);
  });

});

test('Initial load, then drilling in, then back out', function(assert) {
  let datas = [];
  let testStartTime = performanceNow();

  application.perfService.on('transitionComplete', (data) => {
    datas.push(data);
  });

  visit('/company/1/buildings');

  andThen(function() {
    assert.ok(datas, 'Data is present');
    let [data] = datas;
    validateEvent(assert, testStartTime, data);
    assert.equal(datas.length, 1, 'Only one event fired');
  });

  click('a[href=\'/company/1/building/3\']');

  andThen(function() {
    assert.equal(datas.length, 2, 'Only two events fired');
    let data = datas[datas.length - 1];
    assert.equal(data.destURL, '/company/1/building/3', 'Intent URL is correct');
    assert.equal(data.destRoute, 'company.building.index', 'Intent route is correct');
  });

  click('a.back-to-company');

  andThen(function() {
    assert.equal(datas.length, 3, 'Only three events fired');
    let data = datas[datas.length - 1];
    assert.equal(data.destURL, '/company/1/buildings', 'Intent URL is correct');
    assert.equal(data.destRoute, 'company.buildings', 'Intent route is correct');
  });
});

test('Initial load, then drilling in, then pivoting', function(assert) {
  let datas = [];
  let testStartTime = performanceNow();

  application.perfService.on('transitionComplete', (data) => {
    datas.push(data);
  });

  visit('/company/1/buildings');

  andThen(function() {
    assert.ok(datas, 'Data is present');
    let [data] = datas;
    validateEvent(assert, testStartTime, data);
    assert.equal(datas.length, 1, 'Only one event fired');
  });

  click('a[href=\'/company/1/building/3\']');

  andThen(function() {
    assert.equal(datas.length, 2, 'Only two events fired');
    let data = datas[datas.length - 1];
    assert.equal(data.destURL, '/company/1/building/3', 'Intent URL is correct');
    assert.equal(data.destRoute, 'company.building.index', 'Intent route is correct');
  });

  click('a[href=\'/company/1/building/4\']');

  andThen(function() {
    assert.equal(datas.length, 3, 'Only three events fired');
    let data = datas[datas.length - 1];
    assert.equal(data.destURL, '/company/1/building/4', 'Intent URL is correct');
    assert.equal(data.destRoute, 'company.building.index', 'Intent route is correct');
  });
});

test('Initial measureRender', function(assert) {
  let datas = [];
  let testStartTime = performanceNow();

  application.perfService.on('renderComplete', (data) => {
    datas.push(data);
  });

  visit('/company/1/building/2');

  andThen(function() {
    assert.equal(datas.length, 0, 'measureRender is not fired for transitions');
  });

  click('.btn-edit');

  andThen(function() {
    assert.equal(datas.length, 1, 'Only one event fired');
    let [ data ] = datas;
    validateEvent(assert, testStartTime, data, 'render');
  });
});
