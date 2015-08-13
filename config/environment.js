'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
  	emberPerf: {
  		debugMode: true,
  		injectionFactories: ['route', 'adapter']
  	}
  };
};
