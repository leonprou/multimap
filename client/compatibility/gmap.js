/*global google:false*/

var Gmap = function() {

	var self = this,
		markers = [],
		mapOptions = {
			center: new google.maps.LatLng(32.0833, 34.8000),
			zoom: 15,
			zoomControl: false,
			panControl: false,
			streetViewControl: false
		},
		panorama,
		infowindow;

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
		// Meteor.user() !== null ? mapOptions.streetViewControl = true :
		// 	mapOptions.streetViewControl = false;
		self.map.setOptions(mapOptions);
	});

	Deps.autorun(function() {
		var users = Users.find({
			online: true
		}).fetch();

		_.each(markers, function(marker) {
			marker.setMap(null);
		});
		markers = [];

		infowindow = new google.maps.InfoWindow();

		_.each(users, function(user) {
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

			google.maps.event.addListener(marker, 'click', (function(user) {
				return function() {
					var content = UI.renderWithData(Template.infowindow, user),
						wraper = $('<div></div').attr('id', 'infowindow').get(0);
					UI.insert(content, wraper);
					infowindow.setContent(wraper);
					infowindow.open(panorama.getVisible() ? panorama : self.map, this);
				};
			}(user)));

			markers.push(marker);
		});
	});
};

Gmap.prototype.panTo = function() {
	gmap.map.panTo(this.position);
};

Gmap.prototype.streetView = function() {
	window.alert('street View');
};