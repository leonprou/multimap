var map;
var mapOptions;
var panorama;
var markers = [];

function initialize() {
	map = new google.maps.Map(document.getElementById("map-canvas"));

	mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8,
		zoomControl: false,
		panControl: false,
		streetViewControl: false

	};

	Deps.autorun(function() {
		Meteor.user() ? mapOptions.streetViewControl = true :
			mapOptions.streetViewControl = false;
		map.setOptions(mapOptions);
	});

	panorama = map.getStreetView();

	google.maps.event.addListener(panorama, 'position_changed', function() {
		var userLocation = {
			position: {
				lat: panorama.getPosition().lat(),
				lng: panorama.getPosition().lng()
			},
			userId: Meteor.userId(),
			username: Meteor.user().username || Meteor.user().profile.name
		};
		Meteor.call('updateLocation', userLocation);
	});

	Deps.autorun(function() {

		var locations = Locations.find().fetch();

		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];

		debugger;
		var infowindow = new google.maps.InfoWindow();
		for (var i = 0; i < locations.length; i++) {
			var markerOptions = {
					position: locations[i].position,
					map: map,
					title: locations[i].username
			};

			if (locations[i].userId == Meteor.userId())
				markerOptions.icon = '/images/markers/darkgreen_MarkerA.png';
			
			var marker = new google.maps.Marker(markerOptions);
			google.maps.event.addListener(marker, 'click', function(location) {
				return function() {
					debugger;
					// infowindow.setContent(location.username);
					infowindow.setContent(Template.marker_content.render().toHTML());
					infowindow.open(panorama.getVisible() ? panorama : map, this);
				};

			}(locations[i]));

			markers.push(marker);
		}
	});
}


Template.map.rendered = initialize;

Template.map.helpers({
  isLoggedIn: function() {
   		return Meteor.user() != null;
  }
});