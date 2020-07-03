function setDates() {
  const dateContainer = document.getElementById('date_container');

  function removeDate(e) {
    e.currentTarget.parentElement.remove();
  }

  dateContainer.querySelectorAll('.remove-date').forEach(button => button.addEventListener('ajax:success', removeDate));
}

function setAttending() {
  document.querySelectorAll('.attending-toggle').forEach(toggle => toggle.addEventListener('ajax:success', () => {
    const isUnattending = toggle.firstElementChild.classList.contains('green');
    toggle.innerHTML = isUnattending ? '<i class="fa fa-calendar-o"></i>' : '<i class="fa fa-calendar-check-o green"></i>';
    const attendeeCount = toggle.parentElement.parentElement.querySelector('.attendee-count');
    if (attendeeCount) {
      attendeeCount.textContent = (+attendeeCount.textContent + (isUnattending ? -1 : 1)) || "0";
    }
  }));
}