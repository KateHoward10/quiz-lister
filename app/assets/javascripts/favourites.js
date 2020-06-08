document.addEventListener("DOMContentLoaded", function(){
  const favouriteButton = document.getElementById('favourite_button');
  const number = document.querySelector('.favourite-number');

  if (favouriteButton) {
    favouriteButton.addEventListener('click', () => {
      const icon = favouriteButton.firstElementChild;
      const isUnfavouriting = icon.classList.contains('red');
      icon.classList.toggle('red');
      if (number) number.textContent = ((+number.textContent || 0) + (isUnfavouriting ? -1 : 1)) || "";
    });
  }
});