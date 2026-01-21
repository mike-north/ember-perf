import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('articles', function() {
    this.route('article', { path: ':article_id' });
  });
  this.route('companies', function() {
    this.route('info');
  });
  this.route('company', { path: 'company/:id' }, function() {
    this.route('buildings', { path: 'buildings' });
    this.route('building', { path: 'building/:building_id' }, function() {
      this.route('floors');
      this.route('floor', { path: 'floor/:id' });
    });
  });
});

export default Router;
