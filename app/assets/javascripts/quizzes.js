function initMap(lat, lng) {
  const coords = new google.maps.LatLng(lat, lng);

  const mapOptions = {
    center: coords,
    zoom: 14
  };

  const mapContainer = document.getElementById('map_container');
  const venueMap = document.createElement('div');
  venueMap.id = 'map';
  const map = new google.maps.Map(venueMap, mapOptions);

  const marker = new google.maps.Marker({
    position: coords,
    map: map
  });

  mapContainer.appendChild(venueMap);
}

function initMap2() {
  const venueInput = document.getElementById('quiz_venue');
  const postcodeInput = document.getElementById('quiz_postcode');
  const latInput = document.getElementById('quiz_latitude');
  const lngInput = document.getElementById('quiz_longitude');
  const photoInput = document.getElementById('quiz_photo_url');
  const geocodeButton = document.getElementById('geocode_button');
  const selection = document.getElementById('image_selection');
  const photo = document.getElementById('venue_photo');

  let coords = latInput.value && lngInput.value ? new google.maps.LatLng(latInput.value, lngInput.value) : new google.maps.LatLng(51.45946, -2.5907347);

  const mapOptions = {
    center: coords,
    zoom: 14
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  const marker = new google.maps.Marker({
    position: coords,
    animation: google.maps.Animation.DROP,
    map: map,
    draggable: true
  });

  const geocoder = new google.maps.Geocoder;
  const places = new google.maps.places.PlacesService(map);

  function setPhoto(results, status) {
    for (i=0; i < results.photos.length; i++) {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = "radio";
      const image = document.createElement('img');
      const photoUrl = results.photos[i].getUrl({maxHeight:200});
      image.src = photoUrl;
      label.appendChild(input);
      label.appendChild(image);
      selection.appendChild(label);
      input.onclick = function() {
        photo.src = photoUrl;
        photoInput.value = photoUrl;
      }
    }
  }

  function getCoordsFromPostcode() {
    geocoder.geocode({ 'address': `${venueInput.value}, ${postcodeInput.value}` }, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        map.setCenter(marker.getPosition());
        const placeId = results[0].place_id;
        places.getDetails({ placeId: placeId }, setPhoto);
      } else {
        console.log("Uh oh", status);
      }
    });
  }

  if (!latInput.value && !lngInput.value && postcodeInput.value) {
    getCoordsFromPostcode();
  }

  function setInputValues() {
    latlng = marker.getPosition();
    newlat=(Math.round(latlng.lat()*1000000))/1000000;
    newlng=(Math.round(latlng.lng()*1000000))/1000000;
    latInput.value = newlat;
    lngInput.value = newlng;
  };

  geocodeButton.addEventListener('click', function() {
    getCoordsFromPostcode();
    setInputValues();
  });
}
