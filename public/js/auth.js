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
