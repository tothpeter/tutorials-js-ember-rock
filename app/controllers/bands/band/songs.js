import Ember from 'ember';

export default Ember.Controller.extend({
  title: '',

  isAddButtonDisabled: Ember.computed('title', function() {
    return Ember.isEmpty(this.get('title'));
  })
});
