function initDistanceForm() {
  let formOpen = false;
  const select = document.getElementById('sort_select');
  const form = document.getElementById('postcode_form');
  const input = document.getElementById('postcode_input');

  if (window.location.search.includes('postcode')) {
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
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.append('postcode', input.value);
    window.location.search = urlParams;
  })
}