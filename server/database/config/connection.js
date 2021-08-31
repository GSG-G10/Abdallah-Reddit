require('env2')('.env');
const { Pool } = require('pg');

const { DATABASE_URL, TEST_DB_URL, DEV_DB_URL } = process.env;

let dbUrl = '';
if (process.env.NODE_ENV === 'test') {
  dbUrl = TEST_DB_URL;
} else if (process.env.NODE_ENV === 'development') {
  dbUrl = DEV_DB_URL;
} else if (process.env.NODE_ENV === 'production') {
  dbUrl = DATABASE_URL;
} else { throw new Error('error in database URL !'); }

const options = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = new Pool(options);
