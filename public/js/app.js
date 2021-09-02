// modal divs
const newPostModal = document.querySelector('#new-post-modal');
const loginModal = document.querySelector('#login-modal');
const signupModal = document.querySelector('#signup-modal');

// modal buttons
const newPostButton = document.querySelector('#new-post-button');
const loginButton = document.querySelector('#login-button');
const signupButton = document.querySelector('#signup-button');

// close buttons
const closeModalButtons = document.getElementsByClassName('close');

const notAuthDiv = document.querySelector('#not-auth');
const authDiv = document.querySelector('#auth');

const isAuth = () => {
  const cookies = document.cookie;
  if (cookies) {
    if (cookies.split('=')[0] === 'accessToken') {
      return true;
    }
  }

  return false;
};

if (isAuth()) {
  notAuthDiv.style.display = 'none';
  authDiv.style.display = 'flex';
} else {
  notAuthDiv.style.display = 'block';
  authDiv.style.display = 'none';
}

// click away
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
