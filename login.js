document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value;
    const password = passwordInput.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      alert('\t \t \t \t Logged in successfully!');
      window.location.href = 'account.html';
    } else {
      alert('Invalid email or password. Please try again.');
    }
  });
});