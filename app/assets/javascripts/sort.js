function initDistanceForm() {
  let formOpen = false;
  const select = document.getElementById('q_sorts');
  const form = document.getElementById('postcode_form');
  const input = document.getElementById('postcode_input');

  if (window.location.search.includes('nearest_to')) {
    formOpen = true;
    form.style = 'display: inline-flex';
    const urlParams = new URLSearchParams(window.location.search);
    input.value = urlParams.get('nearest_to');
    select.value = 'distance';
  }

  select.addEventListener('change', (e) => {
    formOpen = e.target.value === 'distance';
    form.style = `display: ${formOpen ? 'inline-flex' : 'none'}`;
    if (!formOpen) {
      let search = window.location.search.replace('?', '').split(/[&;]/g);
      search = search.filter(param => !param.startsWith('nearest_to='));
      window.location.search = search.length ? search.join('&') : '';
    }
  });

  document.getElementById('postcode_submit').addEventListener('click', (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.append('nearest_to', input.value);
    window.location.search = urlParams;
  })
}