import Ember from 'ember';

export default Ember.Object.extend({
  name: '',
  description: '',

  init: function() {
    this._super(); // ES2015 for this.super.apply(this, arguments);
    if (!this.get('songs')) {
      this.set('songs', []);
    }
  },

  // setupSongs: Ember.on('init', function() {
  //   if (!this.get('songs')) {
  //     this.set('songs', []);
  //   }
  // }),

  slug: Ember.computed('name', function() {
    return this.get('name').dasherize();
  }),
});