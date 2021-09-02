const newPostModal = document.querySelector('#new-post-modal');
const newPostButton = document.querySelector('#new-post-button');
const closeModalButton = document.querySelector('.close');

window.addEventListener('click', (event) => {
  if (event.target === newPostModal) {
    newPostModal.style.display = 'none';
  }
});

newPostButton.addEventListener('click', () => {
  newPostModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  newPostModal.style.display = 'none';
});
