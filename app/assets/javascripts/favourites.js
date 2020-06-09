function setFavourite() {
  const favouriteButton = document.getElementById('favourite_button');
  const number = document.querySelector('.favourite-number');

  if (favouriteButton) {
    favouriteButton.addEventListener('ajax:success', () => {
      const icon = favouriteButton.firstElementChild;
      const isUnfavouriting = icon.classList.contains('red');
      icon.classList.toggle('red');
      if (number) number.textContent = ((+number.textContent || 0) + (isUnfavouriting ? -1 : 1)) || "";
    });
  }
}

function removeFavourite() {
  const unfavouriteButton = document.querySelector('.unfavourite_button');

  if (unfavouriteButton) {
    unfavouriteButton.addEventListener('ajax:success', () => {
      unfavouriteButton.parentElement.remove();
    })
  }
}