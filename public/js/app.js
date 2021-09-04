/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

const postRequest = (url, data) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.redirected) {
      if (response.url.includes('login')) {
        loginModal.style.display = 'block';
      } else {
        window.location.href = response.url;
      }
    }

    return response;
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.status === 422) {
      swal('validation error !', res.msg, 'error');
    } else if (res.status === 500) {
      swal('server error !', 'some thing went wrong please try again', 'error');
    } else if (res.status === 401) {
      swal('Warning !', res.msg, 'warning');
    }

    return res;
  });

const putRequest = (url, data) => fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.redirected) {
      if (response.url.includes('login')) {
        loginModal.style.display = 'block';
      } else {
        window.location.href = response.url;
      }
    }

    return response;
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.status === 422) {
      swal('validation error !', res.msg, 'error');
    } else if (res.status === 500) {
      swal('server error !', 'some thing went wrong please try again', 'error');
    } else if (res.status === 401) {
      swal('Warning !', res.msg, 'warning');
    }

    return res;
  });

const deleteRequest = (url, data) => fetch(url, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.redirected) {
      if (response.url.includes('login')) {
        loginModal.style.display = 'block';
      } else {
        window.location.href = response.url;
      }
    }

    return response;
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.status === 422) {
      swal('validation error !', res.msg, 'error');
    } else if (res.status === 500) {
      swal('server error !', 'some thing went wrong please try again', 'error');
    } else if (res.status === 401) {
      swal('Warning !', res.msg, 'warning');
    }

    return res;
  });
