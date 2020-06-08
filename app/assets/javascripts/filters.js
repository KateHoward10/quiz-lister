document.addEventListener("DOMContentLoaded", function(){
  const filterToggle = document.getElementById('filter-toggle');
  const searchForm = document.getElementById('quiz_search');

  if (filterToggle && searchForm) {
    filterToggle.addEventListener('click', () => {
      searchForm.classList.toggle('visible');
      filterToggle.textContent = searchForm.classList.contains('visible') ? 'Close' : 'Search / filter';
    });
  }
});