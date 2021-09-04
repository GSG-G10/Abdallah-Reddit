const connection = require('../config/connection');

const getPostsQuery = () => connection.query(
  `SELECT 
    p.id,
    p.title,
    p.body,
    p.image, 
    p.created_at, 
    u.name, 
    u.username, 
    u.id as user_id ,
    (select count(*) from votes v where v.post_id = p.id and v.vote = true) - (select count(*) from votes v where v.post_id = p.id and v.vote = false) as votes_number,
    count(c.post_id) as comments 
    FROM posts p
   INNER JOIN users u
      ON u.id = p.user_id 
   LEFT JOIN comments c
      ON c.post_id = p.id
   group by p.id, u.name, u.username, u.id
   ORDER BY votes_number desc
   `,
);

const getSinglePostQuery = (postId) => connection.query(`
SELECT 
    p.id,
    p.title,
    p.body,
    p.image,
    p.created_at,
    u.name,
    u.username,
    u.id as user_id,
    count(c.id) as comments,
    (select count(*) from votes v where v.post_id = p.id and v.vote = true) - (select count(*) from votes v where v.post_id = p.id and v.vote = false) as votes_number
      FROM posts p
    INNER JOIN users u
      ON u.id = p.user_id 
    LEFT JOIN comments c
      ON c.post_id = p.id
   where p.id = $1
   group by p.id, u.name, u.username, u.id
   ORDER BY votes_number desc
`, [postId]);

const addPostQuery = ({
  title, body, userId, createdAt, image,
}) => connection.query(
  'INSERT INTO posts (title, body, user_id, created_at, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [title, body, userId, createdAt, image],
);

const likePostQuery = ({ postId, userId, vote }) => connection.query(
  'INSERT INTO votes (post_id,user_id, vote) values ($1,$2,$3) ON CONFLICT (post_id, user_id) DO UPDATE SET vote = $3 RETURNING *',
  [postId, userId, vote],
);

const deletePostQuery = (postId) => connection.query(
  'DELETE FROM posts WHERE id = $1 RETURNING *',
  [postId],
);

const getUserPosts = (userId) => connection.query(
  `SELECT p.id,
   p.title,
    p.body,
    p.image,
    p.created_at, 
    u.name, 
    u.username, 
    u.id as user_id , 
    (select count(*) from votes v where v.post_id = p.id and v.vote = true) - (select count(*) from votes v where v.post_id = p.id and v.vote = false) as votes_number,
    count(c.post_id) as comments 
    FROM posts p
   INNER JOIN users u
    ON u.id = p.user_id 
   LEFT JOIN comments c
   ON c.post_id = p.id
   where p.user_id = $1
   group by p.id, u.name, u.username, u.id
   ORDER BY votes_number desc
   `,
  [userId],
);

const getUserVotes = (userId) => connection.query('SELECT * FROM votes where user_id = $1', [userId]);

module.exports = {
  getPostsQuery,
  addPostQuery,
  deletePostQuery,
  likePostQuery,
  getUserPosts,
  getUserVotes,
  getSinglePostQuery,
};
