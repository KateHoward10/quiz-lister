function initForm() {
  const venueInput = document.getElementById('quiz_venue');
  const postcodeInput = document.getElementById('quiz_postcode');
  const addressInput = document.getElementById('quiz_address');
  const latInput = document.getElementById('quiz_latitude');
  const lngInput = document.getElementById('quiz_longitude');
  const geocodeButton = document.getElementById('geocode_button');

  if (latInput.value && lngInput.value) {
    displayMap(latInput.value, lngInput.value);
  }

  function getCoordsFromPostcode() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: `${venueInput.value}, ${postcodeInput.value}` }, function(results, status) {
      if (status == 'OK') {
        const coords = new google.maps.LatLng(51.45946, -2.5907347);

        const mapOptions = {
          center: coords,
          zoom: 14
        };

        let map;
        if (document.getElementById('map')) {
          map = new google.maps.Map(document.getElementById('map'), mapOptions);
        } else {
          const mapContainer = document.getElementById('map_container');
          const venueMap = document.createElement('div');
          venueMap.id = 'map';
          map = new google.maps.Map(venueMap, mapOptions);

          mapContainer.appendChild(venueMap);
        }

        const marker = new google.maps.Marker({
          position: coords,
          map: map
        });

        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);

        const address = results[0].formatted_address;
        addressInput.value = address;

        setInputValues(marker.getPosition());
      } else {
        console.log('Uh oh', status);
      }
    });
  }

  function setInputValues(latlng) {
    newlat = Math.round(latlng.lat() * 1000000) / 1000000;
    newlng = Math.round(latlng.lng() * 1000000) / 1000000;
    latInput.value = newlat;
    lngInput.value = newlng;
  }

  geocodeButton.addEventListener('click', getCoordsFromPostcode);

  const hueInput = document.getElementById('quiz_hue');
  const dayInput = document.getElementById('quiz_day');
  const hueButton = document.getElementById('hue_button');

  function getMultiplier() {
    switch (dayInput.value) {
      case 'Monday':
        return 1;
        break;
      case 'Tuesday':
        return 3;
        break;
      case 'Wednesday':
        return 0;
        break;
      case 'Thursday':
        return 2;
        break;
      case 'Sunday':
        return 4;
        break;
      default:
        return 5;
        break;
    }
  }

  function setHue() {
    if (dayInput.value) {
      const randomHue = Math.floor(getMultiplier() * 60 + Math.random() * 60);
      hueInput.value = randomHue;
      hueInput.style = `background-color: hsl(${randomHue}, 80%, 60%)`;
    }
  }
  hueButton.addEventListener('click', setHue);
  dayInput.addEventListener('change', setHue);
}