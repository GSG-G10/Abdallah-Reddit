/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../server/app');

const dbBuild = require('../server/database/builds/init');
const connection = require('../server/database/config/connection');

jest.setTimeout(100000);

beforeAll(() => dbBuild());

describe('auth end points', () => {
  test('test login endpoint', (done) => {
    request(app)
      .post('/auth/login')
      .send({ username: 'aaamra', password: 'helloworld' })
      .expect(302)
      .expect('location', '/')
      .expect((response) => expect(response.header['set-cookie'][0].split('=')[0]).toBe('accessToken'))
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});

afterAll(() => connection.end());
