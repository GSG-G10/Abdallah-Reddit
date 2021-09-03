/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const saveLoginButton = document.querySelector('#save-login-button');

const saveSignUpButton = document.querySelector('#save-signup-button');

const login = (username, password) => postRequest('/auth/login', { username, password });

const signup = (userData) => postRequest('/auth/signup', { ...userData });

saveLoginButton.addEventListener('click', (e) => {
  e.preventDefault();
  const loginUsername = document.querySelector('#login-username');
  const loginPassword = document.querySelector('#login-password');

  login(loginUsername.value, loginPassword.value);
});

saveSignUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.querySelector('#signup-name').value;
  const username = document.querySelector('#signup-username').value;
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  const confirmedPassword = document.querySelector('#signup-confirmedPassword').value;

  signup({
    name, email, username, password, confirmedPassword,
  });
});

const isAuth = () => {
  const cookies = document.cookie;
  if (cookies) {
    if (cookies.split('=')[0] === 'accessToken') {
      return true;
    }
  }

  return false;
};

let authUser = {};
let userVotes = [];

if (isAuth()) {
  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    postRequest('/auth/logout', []);
  });

  fetch('/auth/user')
    .then((data) => data.json())
    .then((user) => {
      const profileButton = document.getElementById('profile-link');
      profileButton.href = `/profile/${user.id}`;

      const dropName = document.getElementById('drop-name');
      dropName.textContent = user.name;

      authUser = user;
    });

  fetch('/auth/user/votes')
    .then((data) => data.json())
    .then((votes) => {
      userVotes = votes;
    });
}
