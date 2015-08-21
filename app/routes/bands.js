import Ember from 'ember';
import Band from '../models/band';
import Song from '../models/song';


var blackDog = Song.create({
  title: 'Black Dog',
  band: 'Led Zeppelin',
  rating: 3
});
// var yellowLedbetter = Song.create({
//   title: 'Yellow Ledbetter',
//   band: 'Pearl Jam',
//   rating: 4
// });
// var daughter = Song.create({
//   title: 'Daughter',
//   band: 'Pearl Jam',
//   rating: 5
// });
var pretender = Song.create({
  title: 'The Pretender',
  band: 'Foo Fighters',
  rating: 2
});


var ledZeppelin = Band.create({ name: 'Led Zeppelin', songs: [blackDog] });
var pearlJam = Band.create({ name: 'Pearl Jam', description: 'Pearl Jam is an American rock band, formed in Seattle, Washington in 1990.' });
var fooFighters = Band.create({ name: 'Foo Fighters', songs: [pretender] });

var BandsCollection = Ember.ArrayProxy.extend(Ember.SortableMixin, {
  sortProperties: ['name'],
  sortAscending: false,
  content: []
});

var bands = BandsCollection.create();

bands.pushObjects([ledZeppelin, pearlJam, fooFighters]);

export default Ember.Route.extend({
  model: function() {
    return bands;
  },

  afterModel: function(model) {
    var bands = model;
    if (bands.get('length') === 1) {
      console.log("csak 1");
      this.transitionTo('bands.band', bands.get('firstObject'));
    }
  },

  actions: {
    didTransition: function() {
      Ember.$(document).attr('title', 'Bands - Rock & Roll');
    },

    createBand: function() {
      var name = this.get('controller').get('name');
      var band = Band.create({name: name});

      bands.pushObject(band);

      this.get('controller').set('name', '');
      this.transitionTo('bands.band.songs', band);
    }
  }
});
