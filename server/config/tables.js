/* eslint-disable no-console */
import pool from './connection';

pool.on('connect', () => {
  console.log('Connected to DB');
});

/**
 * @description Delete users, announcements, and flags tables
 */
const drop = () => {
  const dropUsersTable = 'DROP TABLE IF EXISTS users CASCADE;';
  const dropTables = `${dropUsersTable};`;

  pool.query(dropTables, () => {
    pool.end();
  });

  pool.on('remove', () => {
    process.exit(0);
  });
};

/**
 * @description Create users tables
 */
const create = () => {
  const createUsersTable = `CREATE TABLE IF NOT EXISTS users(
      id serial PRIMARY KEY,
      firstname varchar NOT NULL,
      lastname varchar NULL,
      email varchar UNIQUE NOT NULL,
      password varchar NOT NULL,
      status varchar NOT NULL,
      isadmin boolean NOT NULL,
      createdon timestamptz NOT NULL
      );`;

  const createTables = `
    ${createUsersTable};
    `;

  pool.query(createTables, (err, res) => {
    console.log(res);
    pool.end();
  });

  pool.on('remove', () => {
    process.exit(0);
  });
};

export {
  drop,
  create,
};

require('make-runnable');
