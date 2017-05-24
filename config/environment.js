/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    emberPerf: {
      debugMode: false,
      logRerenders: true,
      logViewEvents: true,
      injectionFactories: ['route', 'adapter']
    }
  };
};
