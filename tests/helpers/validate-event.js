import { typeOf } from '@ember/utils';

export default function(assert, now, data, eventType = 'transition') {
  assert.ok(data.endTime > data.startTime, 'end time is greater than start time');
  assert.ok(data.endTime > now, 'end time indicates time has passed since test start');
  assert.ok(data.startTime > now, 'start time indicates time has passed since test start');
  assert.equal(typeOf(data.endTime), 'number', 'endTime is a number');
  assert.equal(typeOf(data.startTime), 'number', 'startTime is a number');
  assert.equal(typeOf(data.elapsedTime), 'number', 'elapsedTime is a number');
  assert.equal(data.endTime - data.startTime, data.elapsedTime, 'elapsedTime calculation is correct');
  assert.equal(typeOf(data.viewData), 'array', 'viewData is an array');

  if (eventType === 'transition') {
    assert.equal(typeOf(data.routes), 'array', 'data.routes is an array');


    let rs = data.routes.map((r) => r.name)

    if (rs.includes('articles')) {
      assert.deepEqual(rs, ['application', 'articles', 'articles.article'], 'Proper routes load for articles resource');

    } else {
      assert.deepEqual(rs, ['application', 'loading', 'company', 'company.loading', 'company.buildings'], 'Proper routes load for companies/buildings resource');
    }

    assert.equal(data.routes
      .map((r) => r.startTime)
      .filter((x) => typeOf(x) !== 'number'), 0, 'All route startTimes are numbers');
    assert.equal(data.routes
      .map((r) => r.endTime)
      .filter((x) => typeOf(x) !== 'number'), 0, 'All route endTimes are numbers');
    assert.equal(data.routes
      .map((r) => r.elapsedTime)
      .filter((x) => typeOf(x) !== 'number' && x >= 0), 0, 'All route elapsedTime are numbers > 0');
  }

}
