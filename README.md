# ember-perf

[![Greenkeeper badge](https://badges.greenkeeper.io/mike-north/ember-perf.svg)](https://greenkeeper.io/)

[![Ember Observer Score](http://emberobserver.com/badges/ember-perf.svg)](http://emberobserver.com/addons/ember-perf)
[![Dependency Status](https://david-dm.org/mike-north/ember-perf.svg)](https://david-dm.org/mike-north/ember-perf)
[![devDependency Status](https://david-dm.org/mike-north/ember-perf/dev-status.svg)](https://david-dm.org/mike-north/ember-perf#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/mike-north/ember-perf/badges/gpa.svg)](https://codeclimate.com/github/mike-north/ember-perf)

Package | Ember Versions | Version | Status
--------|----------------|---------|--------
`ember-perf` | `1.11 - 1.13`, `2.4-lts`, `2.8-lts`, `2.12.2`, `Release`, `Beta` | [![npm version](https://badge.fury.io/js/ember-perf.svg)](http://badge.fury.io/js/ember-perf) | [![Build Status](https://travis-ci.org/mike-north/ember-perf.svg?branch=master)](https://travis-ci.org/mike-north/ember-perf)


Page load performance instrumentation for ember.js apps

## Setup

```sh
# Ember.js >= 1.11
ember install ember-perf
```

### Responding to performance events

#### Transition Events

First, create an initializer, which will set up an event listener to monitor
performance events

```sh
ember g ember-perf-initializer monitor-perf

```

This will create files for you called

* **app/initializers/monitor-perf.js**
* **app/instance-initializers/monitor-perf.js**

You then need to go to the instance intializer and fill in the body of the event listener with something useful (i.e., sending the performance data somewhere).

```js
perfService.on('transitionComplete', transitionData => {
  // DO SOMETHING WITH TRANSITION DATA
});
```

#### Render Events

To track render performance within a single route (i.e. how long did it take for an action triggered rerender to complete), you would use the `measureRender` method.

```js
// app/components/x-foo.js
export default Ember.Component.extend({
  emberPerf: Ember.inject.service(),

  actions: {
    measureStuff() {
      const perf = this.get('emberPerf');

      perf.measureRender()
        .then(function(result) {
          // do things with the result
        });
    }
  }
});
```

You can also use the `renderComplete` event on the service from `app/instance-initializers/monitor-perf.js`:

```js
perfService.on('renderComplete', renderData => {
  // Do awesome things!
});
```

### What does this `transitionData` object look like?

Here's an example

```js
{
	"destURL": "/",
	"destRoute": "index",
	"startTime": 402.85299999959534,
	"endTime": 427.16400000063004,
	"routes": [{
		"name": "application",
		"debugContainerKey": "route:application",
		"startTime": 408.78300000076706,
		"views": [],
		"endTime": 413.8860000002751,
		"elapsedTime": 5.102999999508029
	}, {
		"name": "index",
		"debugContainerKey": "route:index",
		"startTime": 415.29199999968114,
		"views": [0, 1, 2], // references to viewData array (by index)
		"endTime": 418.11000000052445,
		"elapsedTime": 2.8180000008433126
	}],
	"viewData": [{
		"startTime": 431.6899999994348,
		"id": "ember341",
		"containerKey": "view:-outlet",
		"endTime": 464.19799999966926,
		"elapsedTime": 32.50800000023446
	}, {
		"startTime": 438.75200000002224,
		"id": "ember347",
		"containerKey": "view:toplevel",
		"parentViewId": "ember341",
		"endTime": 463.9900000001944,
		"elapsedTime": 25.23800000017218
	}, {
		"startTime": 450.5559999997786,
		"id": "ember365",
		"containerKey": "component:-link-to",
		"parentViewId": "ember347",
		"endTime": 463.54000000064843,
		"elapsedTime": 12.984000000869855
	}],
	"elapsedTime": 24.3110000010347
}
```

### Configuration

This addon can be configured in your **config/environment.js** file

```js
if (environment === 'development') {
	// Log transition performance
	ENV.emberPerf = {
      debugMode: true
    };
}

```

* **debugMode** (default: `false`) - Logs transition performance to the browser console

![TransitionPerformance](http://i60.tinypic.com/2dtvfwz.png)

### Warning
\*Ember 2.3 doesn't work with `ember-perf`.

## Developer Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running
Running the app using an ember-try scenario
* `ember try:one <EMBER_TRY_SCENARIO> --- ember serve` ( for example `ember try:one ember-2.4 --- ember serve`)
* Visit the app at http://localhost:4200.

## Running Tests

#### All Supported Ember Versions
* `npm test`

#### Individual Ember Versions
* `ember try:one <EMBER_TRY_SCENARIO>` (for example, `ember try:one ember-2.4`)
* `ember try:one <EMBER_TRY_SCENARIO> --- ember test --server` (for example, `ember try:one ember-2.4 --- ember test --server`)

#### Reset Dependencies
* `ember try:reset`

This command restores the original bower.json from bower.json.ember-try, rm -rfs bower_components and runs bower install. For use if any of the other commands fail to clean up after (they run this by default on completion).

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

![Analytics](https://ga-beacon.appspot.com/UA-66610985-1/mike-north/ember-perf/readme)
