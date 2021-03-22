function displayBigMap(quizzes) {
  const container = document.getElementById('big-map-container');

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
      window.location.href = `/quizzes/${quizzes[i].slug}`;
    });
  }

  container.appendChild(bigMap);
}

function initMiddleForm() {
  const addButton = document.getElementById('add_field');
  const inputContainer = document.getElementById('input_container');
  let inputs = document.querySelectorAll('.postcode-input');

  function addInput() {
    const div = document.createElement('div');
    div.classList.add('field');
    const input = document.createElement('input');
    input.classList.add('postcode-input');
    input.placeholder = `Postcode ${+inputs.length + 1}`;
    inputs = [...inputs, input];
    div.appendChild(input);
    inputContainer.appendChild(div);
  }

  addButton.addEventListener('click', addInput);
}