var map;
var mapOptions;
var panorama;
var markers = [];

function initialize() {
	mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8,
		zoomControl: false,
		panControl: false,
		streetViewControl: false

	};

	if (Meteor.user() != null) {
		mapOptions.zoomControl = true;
	}

	map = new google.maps.Map(document.getElementById("map-canvas"),
		mapOptions);

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


		var infowindow = new google.maps.InfoWindow();
		for (var i = 0; i < locations.length; i++) {
			if (locations[i].userId == Meteor.userId()) {
				var marker = new google.maps.Marker({
					position: locations[i].position,
					map: map,
					title: locations[i].username,
					icon: '/images/markers/darkgreen_MarkerA.png'
				});
			} else {
				var marker = new google.maps.Marker({
					position: locations[i].position,
					map: map,
					title: locations[i].username
				});
			}

			google.maps.event.addListener(marker, 'click', function(location) {
				return function() {
					// if (panorama.getVisible() == false)
					// 	map.panTo(location.position);

					// infowindow.setContent(location.username);
					infowindow.setContent('{{>infowindow}}');
					infowindow.open(panorama.getVisible() ? panorama : map, this);
				};

			}(locations[i]));

			markers.push(marker);
		}
	});
}

window.onload = function() {
	Deps.autorun(function() {
		var mapCanvas = document.getElementById("map-canvas");
		if (Meteor.user()) {
			mapOptions.streetViewControl = true;
		} else {
			mapOptions.streetViewControl = false;
		}
		map.setOptions(mapOptions);
	});
}



Meteor.startup(initialize);