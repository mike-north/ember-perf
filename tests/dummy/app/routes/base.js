import Object from '@ember/object';
import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return Object.create({id: params.article_id});
  }
});
