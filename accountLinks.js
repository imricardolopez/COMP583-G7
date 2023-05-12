function updateAccountLinks() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loginLink = document.querySelector('.account-links .login-link');
  const signUpLink = document.querySelector('.account-links .signup-link');

  if (loggedInUser) {
    loginLink.textContent = `Hello, ${loggedInUser.name}`;
    signUpLink.textContent = 'Sign Out';

    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'account.html';
    });

    signUpLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });

  } else {
    loginLink.textContent = 'Log-in';
    signUpLink.textContent = 'Sign Up';

    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html';
    });

    signUpLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'signup.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateAccountLinks();
});