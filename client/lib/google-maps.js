/*global GoogleMaps:true, _googleMapsLoaded: true*/


GoogleMaps = {
  // public methods
  config: function(options) {
    _.extend(this, options);
  },
  ready: function() {
    this._loadingDependency.depend();
    return this._ready;
  },
  // private methods
  _loaded: function() {
    this._ready = true;
    this._loadingDependency.changed();
  },
  // public members
  apiKey: 'AIzaSyC0BB-mnnlFimPWZJesXCQPLGjIl6_8Ewk',
  // private members
  _ready: false,
  _loadingDependency: new Deps.Dependency()
};

_googleMapsLoaded = function() {
  GoogleMaps._loaded();
};

Meteor.startup(function() {
  if (!GoogleMaps.apiKey) {
    throw new Meteor.Error(-1, "API key not set, use GoogleMaps.config({apiKey:YOUR_API_KEY});");
  }
  $.getScript("https://maps.googleapis.com/maps/api/js?key=" + GoogleMaps.apiKey + "&callback=_googleMapsLoaded");
});