function initForm() {
  const venueInput = document.getElementById('quiz_venue');
  const postcodeInput = document.getElementById('quiz_postcode');
  const addressInput = document.getElementById('quiz_address');
  const latInput = document.getElementById('quiz_latitude');
  const lngInput = document.getElementById('quiz_longitude');
  const dateContainer = document.getElementById('date_container');
  const hiddenDateInput = document.getElementById('quiz_dates');
  const dateInput = document.getElementById('date_input');
  
  if (latInput.value && lngInput.value) {
    const coords = new google.maps.LatLng(latInput.value, lngInput.value);
  
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

  function removeDate(e) {
    console.log(e.currentTarget);
    hiddenDateInput.value = hiddenDateInput.value.split(' ').filter(date => date !== e.currentTarget.value).join(' ');
    e.currentTarget.parentElement.remove();
  }

  function addDate() {
    if (dateInput.value) {
      const date = dateInput.value;
      hiddenDateInput.value = hiddenDateInput.value + ' ' + date;
      dateContainer.innerHTML += `
        <p class="date-item">
          ${(new Date(date)).toLocaleDateString('en-GB', { weekday: 'short', year: '2-digit', month: 'short', day: 'numeric' }).replace(',','')}
          <button class="remove-date" type="button" value=${date}>
            <i class="fa fa-times red"></i>
          </button>
        </p>
      `;
      dateContainer.querySelectorAll('.remove-date').forEach(button => button.addEventListener('click', removeDate));
    }
  }

  document.getElementById('geocode_button').addEventListener('click', getCoordsFromPostcode);
  document.getElementById('add_date').addEventListener('click', addDate);
  dateContainer.querySelectorAll('.remove-date').forEach(button => button.addEventListener('click', removeDate));
}