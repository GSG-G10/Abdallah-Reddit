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
  test('get all posts', async () => {
    const expectedPosts = [
      {
        id: 1,
        title: 'test title',
        body: 'test body',
        likes: 0,
        name: 'Abdallah Ahmed',
        username: 'aaamra',
      },
    ];

    const data = await getPostsQuery();
    expect(data.rows[0].title).toBe(expectedPosts[0].title);
  });

  test('create post', async () => {
    const insertedPost = {
      title: 'post title',
      body: 'post body',
      userId: 1,
      createdAt: '2021-08-31T05:55:09.743Z',
    };
    const data = await addPostQuery(insertedPost);
    expect(data.rows[0].title).toBe(insertedPost.title);
  });

  test('like post', async () => {
    const data = await likePostQuery(1);
    expect(data.rows[0].likes).toBe(1);
  });
});

describe('testing comments queries', () => {
  test('show post comments query', async () => {
    const data = await getCommentsQuery(1);
    expect(data.rows[0].body).toBe('text comment');
  });

  test('add post comment query', async () => {
    const expected = {
      body: 'test body',
      userId: 1,
      postId: 1,
      createdAt: '2021-08-31T05:55:09.743Z',
    };
    const data = await addCommentQuery(expected);
    expect(data.rows[0].body).toBe(expected.body);
  });

  test('like comment', async () => {
    const data = await likeCommentQuery(1);
    expect(data.rows[0].likes).toBe(1);
  });
});

describe('testing auth queries', () => {
  test('login query', async () => {
    const data = await loginQuery('aaamra');
    expect(data.rows[0].username).toBe('aaamra');
  });
});

afterAll(() => connection.end());
