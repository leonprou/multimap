/*global google:false*/
/*jslint todo: true */

var Gmap = function() {

	var self = this,
		markers = {},
		mapOptions = {
			center: new google.maps.LatLng(32.0833, 34.8000),
			zoom: 15,
			disableDefaultUI: true
		},
		panorama,
		infowindow = new google.maps.InfoWindow();

	function createMapControllers() {
		var loginContent = UI.renderWithData(Template.loginButtons, {
				align: "right"
			}),
			controlDiv = document.createElement('div');

		// Set CSS for the control border.
		controlDiv.style.padding = '1px';
		controlDiv.style.backgroundColor = 'white';
		controlDiv.style.borderStyle = 'solid';
		controlDiv.style.borderWidth = '1px';
		controlDiv.style.fontSize = '15px';
		controlDiv.style.cursor = 'pointer';
		controlDiv.style.textAlign = 'center';

		UI.insert(loginContent, controlDiv);

		controlDiv.index = 1;
		self.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
	}

	self.map = new google.maps.Map(document.getElementById("map-canvas"));
	panorama = self.map.getStreetView();

	// Adding the log in contoller to map
	createMapControllers();

	google.maps.event.addListener(panorama, 'position_changed', function() {
		var positon = {
			lat: panorama.getPosition().lat(),
			lng: panorama.getPosition().lng()
		};
		Meteor.call('updateLocation', positon);
	});


	Deps.autorun(function(c) {
		var user = Meteor.user();
		if (user) {
			mapOptions.streetViewControl = true;
			self.map.setOptions(mapOptions);
			if (user.position) {
				self.map.setCenter(user.position);
				c.stop();
			}
		} else {
			self.map.setOptions(mapOptions);
		}
	});

	Users.find({
		'status.online': true,
		'status.idle': {
			$exists: false
		}
	}).observe({
		added: function(user) {
			var markerOptions = {
					position: user.position,
					map: self.map,
					title: user.profile.name
				},
				marker;

			if (user._id === Meteor.userId()) {
				markerOptions.icon = '/images/markers/darkgreen_MarkerA.png';
			}

			marker = new google.maps.Marker(markerOptions);
			markers[user._id] = marker;
			google.maps.event.addListener(marker, 'click', function() {
				var content = UI.renderWithData(Template.infowindow, user),
					wraper = $('<div></div').attr('id', 'infowindow').get(0);
				UI.insert(content, wraper);
				infowindow.setContent(wraper);
				infowindow.open(panorama.getVisible() ? panorama : self.map, this);
			});
		},
		changed: function(user) {
			var marker = markers[user._id];
			marker.setPosition(user.position);
		},
		removed: function(user) {
			var marker = markers[user._id];
			marker.setMap(null);
			google.maps.event.clearInstanceListeners(marker);
			// TODO: rethink the delete process of markers
			markers[user._id] = null;
		},
	});
};