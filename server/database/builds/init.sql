
BEGIN;

DROP TABLE IF EXISTS users, posts, comments CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body text NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    body text NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL
);

INSERT INTO users (name, username, email, password) values
('Abdallah Ahmed', 'aaamra', 'dev.aaamra@gmail.com', '$2a$10$QNvMoLQnY2268uT8z.0Ad.K/DmO6YTYFHwjUaf1u2yzuKEPwbHMTu');

INSERT INTO posts (title, body, user_id, created_at) values 
('test title', 'test body', 1, 'NOW()');

INSERT INTO comments (body, user_id, post_id, created_at) values 
('text comment', 1, 1, 'NOW()');

COMMIT;