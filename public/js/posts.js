/* eslint-disable no-undef */
const savePostButton = document.querySelector('#save-post-button');

const createPost = (postData) => postRequest('/api/posts', postData);

savePostButton.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;
  const image = document.querySelector('#post-image').value;
  const createdAt = moment().format();

  createPost({
    title, body, createdAt, image,
  }).then((data) => {
    if (data.status === 200) {
      swal('will done !', data.msg, 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  });
});
