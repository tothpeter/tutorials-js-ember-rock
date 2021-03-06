import Ember from 'ember';
import { capitalizeWords } from '../../../helpers/capitalize-words';

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's'
  },

  title: '',
  songCreationStarted: false,
  
  newSongPlaceholder: Ember.computed('model.name', function() {
    var bandName = this.get('model.name');
    return "New %@ song".fmt(capitalizeWords(bandName));
  }),

  sortBy: 'ratingDesc',
  sortProperties: Ember.computed('sortBy', function() {
    var options = {
      "ratingDesc": "rating:desc,title:asc",
      "ratingAsc": "rating:asc,title:asc",
      "titleDesc": "title:desc",
      "titleAsc": "title:asc",
    };

    return options[this.get('sortBy')].split(',');
  }),
  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

  searchTerm: '',
  matchingSongs: Ember.computed('model.songs.@each.title', 'searchTerm', function() {
    var searchTerm = this.get('searchTerm').toLowerCase();

    return this.get('model.songs').filter(function(song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }),

  isAddButtonDisabled: Ember.computed('title', function() {
    return Ember.isEmpty(this.get('title'));
  }),

  canCreateSong: Ember.computed('songCreationStarted', 'model.songs.length', function() {
    return this.get('songCreationStarted') || this.get('model.songs.length');
  }),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },
  }
});
