import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import validateEvent from '../../helpers/validate-event';
import performanceNow from 'ember-perf/utils/performance-now';

const { run } = Ember;
moduleFor('service:ember-perf');

test('measureRender starts a timer and schedules ending a timer in the afterRender queue', function(assert) {
  assert.expect(9);

  let testStartTime = performanceNow();
  let promise, result;

  let service = this.subject();

  // start a run loop manually
  run.begin();

  service.on('renderComplete', (data) => {
    result = data;
  });

  promise = service.measureRender();

  run.schedule('afterRender', () => {
    assert.ok(result, 'result should have been set prior to the next afterRender item');
  });

  run.end();

  validateEvent(assert, testStartTime, result, 'render');
});

test('measureRender returns a promise', function(assert) {
  assert.expect(8);

  let testStartTime = performanceNow();
  let service = this.subject();
  let result;

  run(() => {
    result = service.measureRender();
  });

  return result
    .then((resultValue) => {
      validateEvent(assert, testStartTime, resultValue, 'render');
    });
});
