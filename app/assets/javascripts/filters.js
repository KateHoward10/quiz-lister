function toggleFilters() {
  const filterToggle = document.getElementById('filter_toggle');
  const searchForm = document.getElementById('quiz_search');

  if (filterToggle && searchForm) {
    filterToggle.addEventListener('click', () => {
      searchForm.classList.toggle('visible');
      filterToggle.innerHTML = searchForm.classList.contains('visible') ? 'Close <i class="fa fa-times fa-sm"></i>' : 'Search / filter <i class="fa fa-chevron-down fa-sm"></i>';
    });
  }
}