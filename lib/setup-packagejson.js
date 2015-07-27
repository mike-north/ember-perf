'use strict';

var fs = require('fs');

if (['ember-1.7', 'ember-1.8', 'ember-1.9'].indexOf(process.env.EMBER_TRY_SCENARIO) >= 0) {
	var pkgJson = JSON.parse(fs.readFileSync('package.json'));
	var handlebarsContent = JSON.parse(fs.readFileSync('legacy-packages.json'));
	console.log('Setting up package.json for scenario: ' + process.env.EMBER_TRY_SCENARIO);
	pkgJson.name = 'ember-perf-handlebars';
	['devDependencies', 'dependencies'].forEach(function(depType) {
		if (handlebarsContent[depType]) {
			for (var i in handlebarsContent[depType]) {
				if (handlebarsContent[depType][i] === null) {
					//remove pkg from package.json
					delete pkgJson[depType][i];
				}
				else {
					// add pkg version to package.json
					pkgJson[depType][i] = handlebarsContent[depType][i];
				}
			}
		}
	});
	fs.writeFileSync('package.json', JSON.stringify(pkgJson));
}
