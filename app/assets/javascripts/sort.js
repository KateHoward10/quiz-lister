function initDistanceForm() {
  let formOpen = false;

  document.getElementById('sort_select').addEventListener('change', (e) => {
    formOpen = e.target.value === "distance";
    document.getElementById('postcode_form').style = `display: ${formOpen ? "inline-flex" : "none"}`;
  });

  document.getElementById('postcode_submit').addEventListener('click', (e) => {
    e.preventDefault();
    const postcode = document.getElementById('postcode_input').value;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: postcode }, function(results, status) {
      if (status == 'OK') {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('destination', `${lat},${lng}`);
        window.location.search = urlParams;
      } else {
        console.log('Uh oh', status);
      }
    });
  })
}