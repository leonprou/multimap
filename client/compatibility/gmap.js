/*global google:false*/

var Gmap = function() {

	var self = this,
		markers = {},
		mapOptions = {
			center: new google.maps.LatLng(32.0833, 34.8000),
			zoom: 15,
			zoomControl: false,
			panControl: false,
			streetViewControl: false
		},
		panorama,
		infowindow = new google.maps.InfoWindow();

	self.map = new google.maps.Map(document.getElementById("map-canvas"));
	panorama = self.map.getStreetView();

	google.maps.event.addListener(panorama, 'position_changed', function() {
		var positon = {
			lat: panorama.getPosition().lat(),
			lng: panorama.getPosition().lng()
		};
		Meteor.call('updateLocation', positon);
	});


	Deps.autorun(function() {
		mapOptions.streetViewControl = !!Meteor.user();
		self.map.setOptions(mapOptions);
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
		},
	});
};

Gmap.prototype.panTo = function() {
	gmap.map.panTo(this.position);
};

Gmap.prototype.streetView = function() {
	window.alert('street View');
};