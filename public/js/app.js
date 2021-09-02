const newPostModal = document.querySelector('#new-post-modal');
const loginModal = document.querySelector('#login-modal');
const signupModal = document.querySelector('#signup-modal');
const newPostButton = document.querySelector('#new-post-button');
const loginButton = document.querySelector('#login-button');
const signupButton = document.querySelector('#signup-button');
const closeModalButtons = document.getElementsByClassName('close');

window.addEventListener('click', (event) => {
  if (event.target === newPostModal) {
    newPostModal.style.display = 'none';
  } else if (event.target === loginModal) {
    loginModal.style.display = 'none';
  } else if (event.target === signupModal) {
    signupModal.style.display = 'none';
  }
});

newPostButton.addEventListener('click', () => {
  newPostModal.style.display = 'block';
});

loginButton.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

signupButton.addEventListener('click', () => {
  signupModal.style.display = 'block';
});

// eslint-disable-next-line no-restricted-syntax
for (const button of closeModalButtons) {
  button.addEventListener('click', (event) => {
    const target = event.target.parentNode.parentNode.parentNode;
    if (target === newPostModal) {
      newPostModal.style.display = 'none';
    } else if (target === loginModal) {
      loginModal.style.display = 'none';
    } else if (target === signupModal) {
      signupModal.style.display = 'none';
    }
  });
}

// closeModalButtons.forEach((button) => {

// });
// closeModalButton.addEventListener('click', (event) => {
//   newPostModal.style.display = 'none';
//   loginModal.style.display = 'none';
// });
