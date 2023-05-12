function getUserFromLocalStorage() {
  const userString = localStorage.getItem('loggedInUser');
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
}

function updateAccountLinks() {
  const loggedInUser = getUserFromLocalStorage();
  const loginLink = document.querySelector('.account-links .login-link');
  const signUpLink = document.querySelector('.account-links .signup-link');

  if (loggedInUser) {
    loginLink.textContent = `Hello, ${loggedInUser.name}`;
    signUpLink.textContent = 'Sign Out';

    loginLink.href = 'account.html';
    signUpLink.href = 'index.html';

    signUpLink.addEventListener('click', (e) => {
      localStorage.removeItem('loggedInUser');
    });

  } else {
    loginLink.textContent = 'Log-in';
    signUpLink.textContent = 'Sign Up';

    loginLink.href = 'login.html';
    signUpLink.href = 'signup.html';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('header.html')
    .then(response => response.text())
    .then(html => {
      const headerElement = document.querySelector('header');
      headerElement.innerHTML = html;
      updateAccountLinks();
    });
});