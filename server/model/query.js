import pool from '../config/connection';
import helper from '../utils/helper';

const checkifUserExists = async (email) => {
  const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  if (user.rows.length !== 0) {
    return false;
  }
  return true;
};

const saveUser = async (data) => {
  const user = await pool.query('INSERT INTO users(firstname,lastname,email,password,status,isadmin,createdon) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING*',
    [
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.status,
      data.isadmin,
      data.createdon,
    ]);
  // eslint-disable-next-line no-console
  return user;
};

const ifuseralreadyexist = async (email, password) => {
  const userlogin = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  // compare passwords
  const checkPasswords = await helper.passwordcompare(userlogin.rows[0].password, password);
  if (checkPasswords) {
    return userlogin.rows[0];
  }
  return [];
};

export default {
  checkifUserExists,
  saveUser,
  ifuseralreadyexist,
};
