function initMap(lat, lng) {
  const myCoords = new google.maps.LatLng(lat, lng);

  const mapOptions = {
    center: myCoords,
    zoom: 14
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  const marker = new google.maps.Marker({
    position: myCoords,
    map: map
  });
}

function initMap2() {
  const lat = document.getElementById('quiz_latitude').value;
  const lng = document.getElementById('quiz_longitude').value;
  
  const myCoords = new google.maps.LatLng(lat, lng);

  const mapOptions = {
    center: myCoords,
    zoom: 14
  };

  const map = new google.maps.Map(document.getElementById('map2'), mapOptions);

  const marker = new google.maps.Marker({
    position: myCoords,
    animation: google.maps.Animation.DROP,
    map: map,
    draggable: true
  });

  function refreshMarker(){
    var lat = document.getElementById('quiz_latitude').value;
    var lng = document.getElementById('quiz_longitude').value;
    var myCoords = new google.maps.LatLng(lat, lng);
    marker.setPosition(myCoords);
    map.setCenter(marker.getPosition()); 
  }

  document.getElementById('quiz_latitude').onchange = refreshMarker;
  document.getElementById('quiz_longitude').onchange = refreshMarker;

  marker.addListener('drag', function() {
    latlng = marker.getPosition();
    newlat=(Math.round(latlng.lat()*1000000))/1000000;
    newlng=(Math.round(latlng.lng()*1000000))/1000000;
    document.getElementById('quiz_latitude').value = newlat;
    document.getElementById('quiz_longitude').value = newlng;
  });

  marker.addListener('dragend', function() {
    map.panTo(marker.getPosition());   
  });
}