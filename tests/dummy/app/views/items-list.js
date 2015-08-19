import Ember from 'ember';

const { CollectionView, View, computed } = Ember;

export default CollectionView.extend({
  tagName: 'ul',
  itemViewClass: View.extend({
    classNameBindings: ['parentView.itemClass'],
    itemRoute: computed.alias('parentView.itemRoute'),
    templateName: 'items-list-item'
  })
});