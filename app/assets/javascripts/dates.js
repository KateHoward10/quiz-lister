function setDates() {
  const dateContainer = document.getElementById('date_container');

  function removeDate(e) {
    e.currentTarget.parentElement.remove();
  }

  dateContainer.querySelectorAll('.remove-date').forEach(button => button.addEventListener('ajax:success', removeDate));
}