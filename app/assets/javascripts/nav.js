document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('hover-area').addEventListener('click', () => {
    document.getElementById('user-menu').classList.toggle('visible');
  });
});