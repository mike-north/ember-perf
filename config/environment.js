'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
  	emberPerf: {
  		debugMode: false,
  		logRerenders: true,
  		injectionFactories: ['route', 'adapter']
  	}
  };
};
