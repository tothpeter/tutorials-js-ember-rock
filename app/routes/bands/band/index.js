import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function(band) {
    var desc = band.get('description');

    if(Ember.isEmpty(desc)){
      this.transitionTo('bands.band.songs');
    }
    else{
      this.transitionTo('bands.band.details');
    }
  }
});
