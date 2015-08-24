import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

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
  let now = new Date().valueOf();
  application.perfService.on('transitionComplete', data => {
    datas.push(data);
  });

  visit('/company/1/buildings');

  andThen(function() {
    assert.ok(datas, 'Data is present');
    let [data] = datas;

    assert.equal(data.destURL, '/company/1/buildings', 'Intent URL is correct');
    assert.equal(data.destRoute, 'company.buildings', 'Intent route is correct');
    assert.ok(data.endTime > data.startTime, 'end time is greater than start time');
    assert.ok(data.endTime > now, 'end time indicates time has passed since test start');
    assert.ok(data.startTime > now, 'start time indicates time has passed since test start');
    assert.equal(Ember.typeOf(data.endTime), 'number', 'endTime is a number');
    assert.equal(Ember.typeOf(data.startTime), 'number', 'startTime is a number');
    assert.equal(Ember.typeOf(data.elapsedTime), 'number', 'elapsedTime is a number');
    assert.equal(data.endTime - data.startTime, data.elapsedTime, 'elapsedTime calculation is correct');

    assert.equal(Ember.typeOf(data.routes), 'array', 'data.routes is an array');
    assert.deepEqual(data.routes.map(r => r.name), ['application', 'loading', 'company', 'company.loading', 'company.buildings'], 'Proper routes load');
    assert.equal(data.routes
      .map(r => r.startTime)
      .filter(x => Ember.typeOf(x) !== 'number'), 0, 'All route startTimes are numbers');
    assert.equal(data.routes
      .map(r => r.endTime)
      .filter(x => Ember.typeOf(x) !== 'number'), 0, 'All route endTimes are numbers');
    assert.equal(data.routes
      .map(r => r.elapsedTime)
      .filter(x => Ember.typeOf(x) !== 'number'), 0, 'All route elapsedTime are numbers');
  });

});
