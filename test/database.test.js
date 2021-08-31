/* eslint-disable no-undef */

const postsQueries = require('../server/database/queries/PostsQueries');
const dbBuild = require('../server/database/builds/init');
const connection = require('../server/database/config/connection');

jest.setTimeout(100000);

beforeAll(() => dbBuild());

describe('testing posts queries', () => {
  test('get all posts', () => {
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

    postsQueries.getPostsQuery()
      .then((data) => data.rows)
      .then((posts) => {
        expect(posts[0].title).toBe(expectedPosts[0].title);
      })
      .catch((err) => console.log(err));
  });

  test('create post', () => {
    const insertedPost = {
      title: 'post title',
      body: 'post body',
      userId: 1,
      createdAt: '2021-08-31T05:55:09.743Z',
    };
    postsQueries.addPostQuery(insertedPost)
      .then((data) => {
        expect(data.rows[0].title).toBe(insertedPost.title);
      })
      .catch((err) => console.log(err));
  });

  test('like post', () => {
    postsQueries.likePostQuery(1)
      .then((data) => {
        expect(data.rows[0].likes).toBe(1);
      })
      .catch((err) => console.log(err));
  });
});

describe('testing comments queries', () => {
  test('asddasds', () => {
    expect(1).toBe(1);
  });
});

afterAll(() => connection.end());
