/* eslint-disable no-self-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const savePostButton = document.querySelector('#save-post-button');
const allPostsDiv = document.querySelector('.posts');

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

const votePost = (postId, vote) => {
  putRequest(`/api/posts/${postId}/vote`, { vote })
    .then((data) => {
      swal('Success !', data.msg, 'success');
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 3000);
    });
};

const showSinglePost = (post) => {
  const upvote = document.createElement('a');
  upvote.href = '#';
  upvote.innerHTML = '<i class="fas fa-arrow-up"></i>';
  upvote.addEventListener('click', (e) => {
    e.preventDefault();
    // upvote post
    votePost(post.id, true);
  });

  const votesNumber = document.createElement('span');
  votesNumber.classList.add('votes');
  votesNumber.textContent = post.votes_number;

  const downvote = document.createElement('a');
  downvote.href = '#';
  downvote.innerHTML = '<i class="fas fa-arrow-down"></i>';
  downvote.addEventListener('click', (e) => {
    e.preventDefault();
    // downvote post
    votePost(post.id, false);
  });

  // show voted post
  userVotes.forEach((vote) => {
    if (vote.post_id === post.id) {
      if (vote.vote) {
        upvote.style.background = '#ff4500';
      } else {
        downvote.style.background = '#7193ff';
      }
    }
  });

  const left = document.createElement('div');
  left.classList.add('left');
  left.appendChild(upvote);
  left.appendChild(votesNumber);
  left.appendChild(downvote);

  // user
  const userImage = document.createElement('div');
  userImage.classList.add('user-image');
  userImage.innerHTML = '<img src="/images/avatar.png">';

  const userP = document.createElement('p');
  userP.textContent = post.name;
  userP.addEventListener('click', () => {
    window.location.href = `/profile/${post.user_id}`;
  });

  const postTime = document.createElement('span');
  postTime.textContent = moment(post.created_at).fromNow();

  const userName = document.createElement('div');
  userName.classList.add('user-name');
  userName.appendChild(userP);
  userName.appendChild(postTime);

  const userDiv = document.createElement('div');
  userDiv.classList.add('user');
  userDiv.appendChild(userImage);
  userDiv.appendChild(userName);
  // end user

  // post
  const postP = document.createElement('p');
  postP.textContent = post.body;

  const postImage = document.createElement('div');
  postImage.classList.add('post-image');
  if (post.image) {
    postImage.innerHTML = `<img src="${post.image}" alt="">`;
  }

  const postBody = document.createElement('div');
  postBody.classList.add('post-body');
  postBody.appendChild(postP);
  postBody.appendChild(postImage);
  // end post

  // comments
  const postA = document.createElement('a');
  postA.href = `/posts/${post.id}`;
  postA.innerHTML = `<i class="fas fa-comments"></i> ${post.comments} ${post.comments == 1 ? 'comment' : 'comments'}`;

  const postComments = document.createElement('div');
  postComments.classList.add('post-comments');
  postComments.appendChild(postA);

  // end comments
  const right = document.createElement('div');
  right.classList.add('right');
  right.appendChild(userDiv);
  right.appendChild(postBody);
  right.appendChild(postComments);

  const postDiv = document.createElement('div');
  postDiv.classList.add('post');
  postDiv.appendChild(left);
  postDiv.appendChild(right);

  allPostsDiv.appendChild(postDiv);
};

const showPosts = (posts) => {
  allPostsDiv.textContent = '';

  posts.forEach((post) => {
    showSinglePost(post);
  });
};

const path = document.location.pathname;

if (path.includes('profile')) {
  const userId = path.split('/')[2];

  fetch(`/api/users/${userId}/posts`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length === 0) {
        swal('what are trying to do ?!', "don't change any thing in the URL please !", 'warning');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        const name = document.getElementById('profile-name');
        name.textContent = data[0].name;
        const username = document.getElementById('profile-username');
        username.textContent = data[0].username;
        showPosts(data);
      }
    });
} else if (path === '/') {
  fetch('/api/posts')
    .then((res) => res.json())
    .then((data) => showPosts(data));
}
