'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
  	emberPerf: {
  		debugMode: true,
  		logRerenders: true,
  		injectionFactories: ['route', 'adapter']
  	}
  };
};
