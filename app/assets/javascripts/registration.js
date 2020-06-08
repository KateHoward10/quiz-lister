document.addEventListener("DOMContentLoaded", function(){
  const passwordInput = document.getElementById('user_password');
  if (passwordInput) passwordInput.addEventListener('input', e => {
    passwordInput.style = `background-color: hsl(${Math.min(e.target.value.length * 10, 120)},100%,40%)`;
  });
});