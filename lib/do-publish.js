var spawn = require('child_process').spawn;
var RSVP  = require('rsvp');
var fs    = require('fs');

'use strict';

function packageJsonData() {
	return JSON.parse(fs.readFileSync('package.json'));
}

function tagName(variant) {
	var base = packageJsonData().version;
	if (variant) {
		base = base + '-' + variant;
	}
	return base;
}

function publish(pkgName) {
	return new RSVP.Promise(function (resolve, reject) {
		var p = spawn('/usr/local/bin/npm', ['publish']);
		p.on('close', function (code) {
			if (code) {
				reject('Error publishing package: ' + (pkgName || 'standard'));
			} else {
				console.log('Published pakage');
				resolve();
			}
		});
		p.on('error', function (code) {
			console.log('arguments', arguments);
			reject();
		});
	});
}


function doPublish() {
	publish().then(function () {

		var p = spawn('node', ['lib/setup-packagejson.js'], {
			env: {
				PATH: '/usr/local/bin',
				EMBER_TRY_SCENARIO: 'ember-1.8'
			}
		});
		p.on('close', function (code) {
			publish('legacy').then(function () {
				console.log('Publishing complete. Resetting package.json');
				spawn('node', ['lib/reset-packagejson.js']);
			}).catch(function(e) {
				console.error(e);
			});
		});
	}).catch(function(e) {
		console.error(e);
	});
}
console.log(tagName());