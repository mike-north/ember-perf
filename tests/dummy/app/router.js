import Ember from 'ember';
import config from './config/environment';

const EMBER_VERSION_REGEX = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:(?:\-(alpha|beta)\.([0-9]+)(?:\.([0-9]+))?)?)?(?:\+(canary))?(?:\.([0-9abcdef]+))?(?:\-([A-Za-z0-9\.\-]+))?(?:\+([A-Za-z0-9\.\-]+))?$/;

/**
 * @private
 *
 * VERSION_INFO[i] is as follows:
 *
 * 0  complete version string
 * 1  major version
 * 2  minor version
 * 3  trivial version
 * 4  pre-release type (optional: "alpha" or "beta" or undefined for stable releases)
 * 5  pre-release version (optional)
 * 6  pre-release sub-version (optional)
 * 7  canary (optional: "canary", or undefined for stable releases)
 * 8  SHA (optional)
 */
const VERSION_INFO = EMBER_VERSION_REGEX.exec(Ember.VERSION);
const IS_PRE_17 = parseInt(VERSION_INFO[1], 10) < 2 && parseInt(VERSION_INFO[2], 10) < 7;

const NESTED_ROUTE_FN = IS_PRE_17 ? 'resource' : 'route';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this[NESTED_ROUTE_FN]('companies', function() {
    this.route('info');
  });
  this[NESTED_ROUTE_FN]('company', { path: 'company/:id' }, function() {
    this[NESTED_ROUTE_FN]('buildings');
    this[NESTED_ROUTE_FN]('building', { path: 'building/:id' }, function() {
      this.route('floors');
      this.route('floor', { path: 'floor/:id' });
    });
  });
});

export default Router;
