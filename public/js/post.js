/* eslint-disable no-self-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */

const commentsDiv = document.querySelector('.comments');
const postComments = document.getElementById('post-comments');

const votePost = (postId, vote) => {
  putRequest(`/api/posts/${postId}/vote`, { vote })
    .then((data) => {
      swal('Success !', data.msg, 'success');
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 3000);
    });
};

const showPost = (post) => {
  const postUserName = document.getElementById('post-user-name');
  const postCreatedAt = document.getElementById('post-createdAt');
  const postImageDiv = document.getElementById('post-image2');
  const postBody = document.getElementById('post-body2');
  const votesNumber = document.getElementById('votes-number');
  const commentUsername = document.getElementById('comment-username');

  commentUsername.textContent = authUser.name;
  votesNumber.textContent = post.votes_number;
  postBody.textContent = post.body;
  postUserName.textContent = post.name;
  postCreatedAt.textContent = moment(post.created_at).fromNow();
  if (post.image != null) {
    postImageDiv.innerHTML = `<img src="${post.image}">`;
  } else {
    postImageDiv.innerHTML = '';
  }

  postComments.innerHTML = `<i class="fas fa-comments"></i> ${post.comments} ${post.comments == 1 ? 'comment' : 'comments'}`;

  const upvote = document.getElementById('upvote-button');
  upvote.addEventListener('click', (e) => {
    e.preventDefault();
    // upvote post
    votePost(post.id, true);
  });

  const downvote = document.getElementById('downvote-button');
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
};

showComment = (comment) => {
  const user = document.createElement('p');
  user.textContent = comment.name;

  const createAt = document.createElement('span');
  createAt.textContent = moment(comment.created_at).fromNow();

  const userName = document.createElement('div');
  userName.classList.add('user-name');
  userName.appendChild(user);
  userName.appendChild(createAt);

  const userImage = document.createElement('div');
  userImage.classList.add('user-image');
  userImage.innerHTML = '<img src="/images/avatar.png">';

  const commentUser = document.createElement('div');
  commentUser.classList.add('comment-user');
  commentUser.appendChild(userImage);
  commentUser.appendChild(userName);

  const commentText = document.createElement('div');
  commentText.classList.add('comment-text');
  commentText.innerHTML = `<p>${comment.body}</p>`;

  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  commentDiv.appendChild(commentUser);
  commentDiv.appendChild(commentText);

  commentsDiv.appendChild(commentDiv);
};

const saveComment = (commentData) => postRequest('/api/comments', commentData);

document.addEventListener('DOMContentLoaded', () => {
  const postId = document.location.pathname.split('/')[2];

  const saveCommentButton = document.getElementById('save-comment-button');
  const commentBodyInput = document.getElementById('comment-body-input');

  saveCommentButton.addEventListener('click', (e) => {
    e.preventDefault();
    const body = commentBodyInput.value;
    const createdAt = moment().format();

    saveComment({ body, postId, createdAt })
      .then((data) => {
        swal('Success !', data.msg, 'success');
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 3000);
      });
  });

  fetch(`/api/posts/${postId}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 404) {
        swal('what are trying to do ?!', "don't change any thing in the URL please !", 'warning');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        showPost(res);
      }
    });

  fetch(`/api/posts/${postId}/comments`)
    .then((res) => res.json())
    .then((res) => {
      postComments.innerHTML = `<i class="fas fa-comments"></i> ${res.length} ${res.length == 1 ? 'comment' : 'comments'}`;
      commentsDiv.textContent = '';

      res.forEach((comment) => {
        showComment(comment);
      });
    });
});
