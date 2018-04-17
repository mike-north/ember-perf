import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['uselessQP'],

  actions: {
    toggleUselessQP() {
      this.set('uselessQP', this.get('uselessQP') === 'alpha' ? 'beta' : 'alpha');
    }
  }
});
