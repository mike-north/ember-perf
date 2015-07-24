'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
  	emberPerf: {
  		injectionFactories: ['route', 'adapter']
  	}
  };
};
