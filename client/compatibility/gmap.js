/*global google:false, UserSub:false*/
/*jslint todo: true */

var Gmap = function() {

	var self = this,
		mapOptions = {
			center: new google.maps.LatLng(32.0833, 34.8000),
			zoom: 15,
			disableDefaultUI: true
		},
		panorama,
		infowindow = new google.maps.InfoWindow();

	function createMapControllers() {
		var loginContent = UI.renderWithData(Template.loginButtons, {
				align: 'right'
			}),
			userContent= UI.render(Template.usersPanel),
			loginControl = $('<div></div>').addClass('map-panel top-panel')[0],
			usersControl = $('<div></div>')[0];

		UI.insert(loginContent, loginControl);
		UI.insert(userContent, usersControl);
		self.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(loginControl);
		self.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(usersControl);
	}

	self.map = new google.maps.Map(document.getElementById('map-canvas'));
	self._markers = [];
	panorama = self.map.getStreetView();

	// Adding the custom map controllers
	createMapControllers();

	google.maps.event.addListener(panorama, 'position_changed', function() {
		var positon = {
			lat: panorama.getPosition().lat(),
			lng: panorama.getPosition().lng()
		};
		Meteor.call('updateLocation', positon);
	});


	Deps.autorun(function(c) {
		if (!UserSub.ready()) {
			return;
		}

		var user = Meteor.user();
		if (user) {
			mapOptions.streetViewControl = true;
			self.map.setOptions(mapOptions);
			if (user.position) {
				self.map.setCenter(user.position);
			}
			c.stop();
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
			self._markers[user._id] = marker;
			google.maps.event.addListener(marker, 'click', function() {
				var content = UI.renderWithData(Template.infowindow, user),
					wraper = $('<div></div').attr('id', 'infowindow').get(0);
				UI.insert(content, wraper);
				infowindow.setContent(wraper);
				infowindow.open(panorama.getVisible() ? panorama : self.map, this);
			});
		},
		changed: function(user) {
			var marker = self._markers[user._id];
			marker.setPosition(user.position);
		},
		removed: function(user) {
			var marker = self._markers[user._id];
			marker.setMap(null);
			google.maps.event.clearInstanceListeners(marker);
			// TODO: rethink the delete process of markers
			self._markers[user._id] = null;
		},
	});
};