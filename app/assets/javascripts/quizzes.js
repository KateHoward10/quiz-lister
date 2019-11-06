function displayMap(lat, lng) {
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

function initQuiz() {
  const venueInput = document.getElementById('quiz_venue');
  const postcodeInput = document.getElementById('quiz_postcode');
  const addressInput = document.getElementById('quiz_address');
  const latInput = document.getElementById('quiz_latitude');
  const lngInput = document.getElementById('quiz_longitude');
  const photoInput = document.getElementById('quiz_photo_url');
  const geocodeButton = document.getElementById('geocode_button');
  const selection = document.getElementById('image_selection');

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
      hueInput.value = Math.floor(getMultiplier() * 60 + Math.random() * 60);
    }
  }
  hueButton.addEventListener('click', setHue);
}

function showMap(quizzes) {
  const container = document.getElementById('big-map-container');
  const info = document.getElementById('info-window');

  const initialCoords = new google.maps.LatLng(51.45946, -2.5907347);

  const mapOptions = {
    center: initialCoords,
    zoom: 13
  };

  const bigMap = document.createElement('div');
  bigMap.id = 'big-map';
  const map = new google.maps.Map(bigMap, mapOptions);

  for (let i = 0; i < quizzes.length; i++) {
    const coords = new google.maps.LatLng(quizzes[i].latitude, quizzes[i].longitude);
    const marker = new google.maps.Marker({
      position: coords,
      map: map
    });
    const infoWindow = new google.maps.InfoWindow({
      content: quizzes[i].venue
    });
    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
      infoWindow.close();
    });
    google.maps.event.addListener(marker, 'click', function() {
      window.location.href = `/quizzes/${quizzes[i].id}`;
    });
  }

  container.appendChild(bigMap);
}

function toggleFilters() {
  const filterToggle = document.getElementById('filter-toggle');
  const searchForm = document.getElementById('quiz_search');
  let filtersVisible = false;

  filterToggle.addEventListener('click', () => {
    if (filtersVisible) {
      filtersVisible = false;
      searchForm.classList.remove('visible');
      filterToggle.textContent = 'Search / filter';
    } else {
      filtersVisible = true;
      searchForm.classList.add('visible');
      filterToggle.textContent = 'Close';
    }
  });
}
