function scroll() {
  window.addEventListener('scroll', () => {
    if ('URLSearchParams' in window) {
      function setPage(newPage) {
        const searchParams = new URLSearchParams(window.location.search);
        const page = +searchParams.get('page');
        searchParams.set('page', newPage(page));
        window.location.search = searchParams.toString();
      }

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setPage(n => n > 0 ? n++ : 2);
      } else if (window.scrollY == 0) {
        setPage(n => n > 1 ? n-- : 1);
      }
    }
  });
}