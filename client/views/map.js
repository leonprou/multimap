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
		var positon = {
			lat: panorama.getPosition().lat(),
			lng: panorama.getPosition().lng()
		}
		Meteor.call('updateLocation', positon);
	});

	Deps.autorun(function() {
		var locations = Users.find({online: true}).fetch();

		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		markers = [];

		var infowindow = new google.maps.InfoWindow();
		for (var i = 0; i < locations.length; i++) {
			var markerOptions = {
					position: locations[i].position,
					map: map,
					title: locations[i].username || locations[i].profile.name
			};

			if (locations[i]._id == Meteor.userId())
				markerOptions.icon = '/images/markers/darkgreen_MarkerA.png';
			
			var marker = new google.maps.Marker(markerOptions);
			
			google.maps.event.addListener(marker, 'click', function(location) {
				return function() {
					
					console.log(location);
					var content = UI.renderWithData(Template.infowindow, location);
					var wraper = $('<div></div').attr('id','infowindow').get(0);
					UI.insert(content, wraper);
					infowindow.setContent(wraper);
					infowindow.open(panorama.getVisible() ? panorama : map, this);
				};

			}(locations[i]));

			markers.push(marker);
		}
	});
}


Template.map.rendered = initialize;