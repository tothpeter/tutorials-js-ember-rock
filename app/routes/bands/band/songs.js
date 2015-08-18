import Ember from 'ember';
import Song from '../../../models/song';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('bands.band');
  },

  actions: {
    createSong: function() {
      var title = this.get('controller').get('title');
      var band = this.modelFor('bands.band');
      
      var song = Song.create({title: title, band: band});

      band.get('songs').pushObject(song);

      this.get('controller').set('title', '');
    },

    updateRating: function(options) {
      options.item.set('rating', options.rating);
    }
  }
});
