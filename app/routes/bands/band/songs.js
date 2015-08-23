import Ember from 'ember';
import { capitalizeWords as capitalize } from '../../../helpers/capitalize-words';
// import wait from '../../../utils/wait';

export default Ember.Route.extend({
  // model: function() {
    // return wait(this.modelFor('bands.band'),  2 * 1000);
  // },

  actions: {
    didTransition: function() {
      var band = this.modelFor('bands.band');
      var name = capitalize(band.get('name'));
      Ember.$(document).attr('title', '%@ songs - Rock &amp; Roll'.fmt(name));
    },

    createSong: function() {
      var controller = this.get('controller'),
          band = this.modelFor('bands.band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });

      song.save().then(function() {
        controller.set('title', '');
      });
    },

    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;

      if (song.get('rating') === rating) {
        rating = 0;
      }

      song.set('rating', rating);
      song.save();
    }
  }
});
