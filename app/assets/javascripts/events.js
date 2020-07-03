function setDates() {
  const dateContainer = document.getElementById('date_container');

  function removeDate(e) {
    e.currentTarget.parentElement.remove();
  }

  dateContainer.querySelectorAll('.remove-date').forEach(button => button.addEventListener('ajax:success', removeDate));
}

function setAttending() {
  document.querySelectorAll('.attending-toggle').forEach(toggle => toggle.addEventListener('ajax:success', () => {
    toggle.innerHTML = toggle.firstElementChild.classList.contains('green') ? '<span>Attend</span>' : '<i class="fa fa-check green"></i><span> Attending</span>';
  }));
}