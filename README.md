# ember-perf

[![Build Status](https://travis-ci.org/mike-north/ember-perf.svg?branch=master)](https://travis-ci.org/mike-north/ember-perf)
[![Dependency Status](https://david-dm.org/mike-north/ember-perf.svg)](https://david-dm.org/mike-north/ember-perf)
[![devDependency Status](https://david-dm.org/mike-north/ember-perf/dev-status.svg)](https://david-dm.org/mike-north/ember-perf#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/mike-north/ember-perf/badges/gpa.svg)](https://codeclimate.com/github/mike-north/ember-perf)

Package | Ember Versions | Version | Status
--------|----------------|---------|--------
`ember-perf` | `1.10`, `1.11`, `1.12`, `1.13` | [![npm version](https://badge.fury.io/js/ember-perf.svg)](http://badge.fury.io/js/ember-perf) | [![Build Status](https://travis-ci.org/mike-north/ember-perf.svg?branch=master)](https://travis-ci.org/mike-north/ember-perf)
`ember-perf-handlebars` | `1.5`, `1.6`, `1.7`, `1.8`, `1.9` |  [![npm version](https://badge.fury.io/js/ember-perf-handlebars.svg)](http://badge.fury.io/js/ember-perf-handlebars) | [![Build Status](https://travis-ci.org/mike-north/ember-perf.svg?branch=handlebars)](https://travis-ci.org/mike-north/ember-perf)

Page load performance instrumentation for ember.js apps

## Setup

### Ember.js < 1.10

```
ember install ember-perf-handlebars
```

### Ember.js >= 1.10

```
ember install ember-perf
```

## Developer Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `npm run tryver <EMBER_TRY_SCENARIO> s` (for example, `npm run tryver ember-1.8 s`)
* Visit your app at http://localhost:4200.

## Running Tests

* `npm run tryver <EMBER_TRY_SCENARIO>` (for example, `npm run tryver ember-1.8`)
* `npm run tryver <EMBER_TRY_SCENARIO> test --server` (for example, `npm run tryver ember-1.8 test --server`)

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

![Analytics](https://ga-beacon.appspot.com/UA-66610985-1/mike-north/ember-perf/readme)
