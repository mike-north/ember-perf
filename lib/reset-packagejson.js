var fs = require('fs');
var spawn = require('child_process').spawn;

var pkgJson = JSON.parse(fs.readFileSync('package.json.bak'));
fs.writeFileSync('package.json', JSON.stringify(pkgJson, null, 2));

spawn('rm', ['package.json.bak']);
