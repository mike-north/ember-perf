var spawn = require('child_process').spawn;
var rsvp = require('rsvp');

'use strict';

function publish() {
	return new RSVP.Promise(function (resolve, reject) {
		var p = spawn('npm', ['publish']);
		p.on('close', function (code) {
			resolve();
		});
	});
}

publish().then(function () {
	var p = spawn('node', ['lib/setup-packagejson.js'], {
		env: {
			'EMBER_TRY_SCENARIO': 'ember-1.8'
		}
	});
	p.on('close', function (code) {
		publish();
	});
});