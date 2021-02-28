function initDistanceForm() {
  let formOpen = false;
  const select = document.getElementById('sort_select');
  const form = document.getElementById('postcode_form');

  if (window.location.search.includes('location')) {
    select.querySelector("option[value=distance]").selected = true;
    formOpen = true;
    form.style = "display: inline-flex";
  } else {
    select.firstElementChild.selected = true;
  }

  select.addEventListener('change', (e) => {
    formOpen = e.target.value === 'distance';
    form.style = `display: ${formOpen ? "inline-flex" : "none"}`;
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
        urlParams.append('location', `${lat},${lng}`);
        window.location.search = urlParams;
      } else {
        console.log('Uh oh', status);
      }
    });
  })
}