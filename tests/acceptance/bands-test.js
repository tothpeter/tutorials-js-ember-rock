import Ember from 'ember';
import Pretender from 'pretender';
import { module, test } from 'qunit';
import startApp from 'rarwe/tests/helpers/start-app';
import httpStubs from '../helpers/http-stubs';

var application,
    server;

module('Acceptance | bands', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('List bands', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function() {
      var bands = JSON.stringify({
        bands: [
          { id: 1, name: 'Radiohead' },
          { id: 2, name: 'Long Distance Calling' },
        ]
      });

    return [200, {"Content-Type": "application/json"}, bands];
    });
  });

  visit('/bands');

  andThen(function() {
    assert.equal(find('.band-link').length, 2, "All band links are rendered");
    assert.equal(find('.band-link:contains("Radiohead")').length, 1, "First band link contains the band name");
    assert.equal(find('.band-link:contains("Long Distance Calling")').length, 1, "The other band link contains the band name");
  });
});

test('Create a new band', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Radiohead' }
      ]
    });
    
    httpStubs.stubCreateBand(this);
    
  });

  visit('/bands');

  fillIn('.new-band', 'Long Distance Calling');
  click('.new-band-button');

  andThen(function() {
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', "Created band appears at the end of the list");
    assertElement(assert, '.nav a.active:contains("Songs")', "The Songs tab is active");
  });
});


test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function(){
      var bands = JSON.stringify({
        bands: [
          { id: 1, name: 'Radiohead' },
        ]
      });

      return [200, {"Content-Type": "application/json"}, bands];
    });

    this.post('/songs', function() {
      var song = JSON.stringify({
        song: {
          id: 1,
          title: 'Killer Cars'
        }
      });

      return [200, {"Content-Type": "application/json"}, song];
    });
  });

  selectBand('Radiohead');
  click('a:contains("create one")');
  fillIn('.new-song', 'Killer Cars');
  submit('.new-song-form');

  andThen(function() {
    assert.equal(find('.songs .song:contains("Killer Cars")').length, 1, "Creates the song and displays it in the list");
  });
});