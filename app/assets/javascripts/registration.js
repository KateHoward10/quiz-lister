function passwordFeedback() {
  const passwordInput = document.getElementById('user_password');
  const passwordConfirmation = document.getElementById('user_password_confirmation');
  const confirmIcons = document.querySelectorAll('.confirm-icon');

  if (passwordInput) {
    passwordInput.addEventListener('input', e => {
      e.target.style = `background-color: hsl(${Math.min(e.target.value.length * 10, 120)},100%,40%)`;
    });

    if (passwordConfirmation && confirmIcons) passwordConfirmation.addEventListener('input', e => {
      confirmIcons.forEach(icon => icon.style = `display: ${passwordInput.value === e.target.value ? 'flex' : 'none'}`);
      e.target.style = `background-color: ${passwordInput.value === e.target.value ? `hsl(${Math.min(e.target.value.length * 10, 120)},100%,40%)` : '#fff'}`;
    });
  }
}