/* eslint-disable no-undef */

const {
  getPostsQuery,
  addPostQuery,
  likePostQuery,
} = require('../server/database/queries/PostsQueries');
const {
  getCommentsQuery,
  addCommentQuery,
  likeCommentQuery,
} = require('../server/database/queries/CommentsQueries');

const { loginQuery, signUpQuery } = require('../server/database/queries/AuthQueries');

const dbBuild = require('../server/database/builds/init');
const connection = require('../server/database/config/connection');

beforeAll(() => dbBuild());

describe('testing posts queries', () => {
  test('get all posts', () => {
    const expectedPosts = [
      {
        id: 1,
        title: 'first post',
        body: 'test body',
        likes: 0,
        name: 'Abdallah Ahmed',
        username: 'aaamra',
      },
    ];

    return getPostsQuery().then((data) => {
      expect(data.rows[0].title).toBe(expectedPosts[0].title);
    });
  });

  test('create post', () => {
    const insertedPost = {
      title: 'post title',
      body: 'post body',
      userId: 1,
      createdAt: '2021-08-31T05:55:09.743Z',
    };
    return addPostQuery(insertedPost).then((data) => {
      expect(data.rows[0].title).toBe(insertedPost.title);
    });
  });
  const vote = {
    postId: 1,
    userId: 1,
    vote: true,
  };
  test('vote post', () => likePostQuery(vote).then((data) => {
    expect(data.rows[0].user_id).toBe(vote.userId);
    expect(data.rows[0].post_id).toBe(vote.postId);
    expect(data.rows[0].vote).toBe(vote.vote);
  }));
});

describe('testing comments queries', () => {
  test('add post comment query', () => {
    const expected = {
      body: 'test body',
      userId: 1,
      postId: 1,
      createdAt: '2021-08-31T05:55:09.743Z',
    };
    return addCommentQuery(expected).then((data) => {
      expect(data.rows[0].body).toBe(expected.body);
    });
  });

  test('show post comments query', () => getCommentsQuery(1).then((data) => {
    expect(data.rows[0].body).toBe('test body');
  }));

  test('like comment', () => likeCommentQuery(1)
    .then((data) => {
      expect(data.rows[0].likes).toBe(1);
    }));
});

describe('testing auth queries', () => {
  test('login query', () => loginQuery('aaamra').then((data) => {
    expect(data.rows[0].username).toBe('aaamra');
  }));

  test('signup query', () => {
    const expectedUser = {
      name: 'Abdallah',
      username: 'aaamra2',
      email: 'e@asd.com',
      password: 'test password',
    };
    return signUpQuery(expectedUser).then((data) => {
      expect(data.rows[0].username).toBe(expectedUser.username);
    });
  });
});

afterAll(() => connection.end());
