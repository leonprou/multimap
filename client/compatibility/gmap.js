var Gmap = function() {

	var self = this,
		markers = [],
		mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 8,
			zoomControl: false,
			panControl: false,
			streetViewControl: false
		};

	self.map = new google.maps.Map(document.getElementById("map-canvas"));
	var panorama = self.map.getStreetView();

	google.maps.event.addListener(panorama, 'position_changed', function() {
		var positon = {
			lat: panorama.getPosition().lat(),
			lng: panorama.getPosition().lng()
		}
		Meteor.call('updateLocation', positon);
	});


	Deps.autorun(function() {
		Meteor.user() ? mapOptions.streetViewControl = true :
			mapOptions.streetViewControl = false;
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

		var infowindow = new google.maps.InfoWindow();

		_.each(users, function(user) {
			var markerOptions = {
				position: user.position,
				map: self.map,
				title: user.profile.name
			};

			if (user._id == Meteor.userId())
				markerOptions.icon = '/images/markers/darkgreen_MarkerA.png';

			var marker = new google.maps.Marker(markerOptions);

			google.maps.event.addListener(marker, 'click', function(user) {
				return function() {
					var content = UI.renderWithData(Template.infowindow, user);
					var wraper = $('<div></div').attr('id', 'infowindow').get(0);
					UI.insert(content, wraper);
					infowindow.setContent(wraper);
					infowindow.open(panorama.getVisible() ? panorama : self.map, this);
				};
			}(user));

			markers.push(marker);
		});
	});
}
Gmap.prototype.panTo = function(arg) {
	gmap.map.panTo(this.position);
};

Gmap.prototype.streetView = function() {
	alert('street View');
};