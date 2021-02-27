function initDistanceForm() {
  let formOpen = false;

  document.getElementById('sort_select').addEventListener('change', (e) => {
    formOpen = e.target.value === "distance";
    document.getElementById('postcode_form').style = `display: ${formOpen ? "inline-flex" : "none"}`;
  });
}