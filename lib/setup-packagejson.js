var spawn = require('child_process').spawn;

if (['ember-1.7', 'ember-1.8', 'ember-1.9'].indexOf(process.env.EMBER_TRY_SCENARIO) >= 0) {
  spawn('cp', ['package.handlebars.json', 'package.json']);
}
