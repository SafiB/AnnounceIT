// import { compare } from 'bcrypt';
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

const saveAnnounce = async (data1) => {
  const announcements = await pool.query('INSERT INTO announcements(highlight,details,status,posted_date,createdby) VALUES($1,$2,$3,$4,$5) RETURNING*',
    [
      data1.highlight,
      data1.details,
      data1.status,
      data1.posted_date,
      data1.createdby,
    ]);
  // eslint-disable-next-line no-console
  return announcements;
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
const ifannouncementExist = async (highlight, createdby) => {
  const announcecreate = await pool.query('SELECT * FROM announcements WHERE highlight=$1 and createdby=$2', [highlight, createdby]);
  if (announcecreate.rows.length === 0) {
    return true;
  }
  return false;
};
/* const ifpostinguserexist = async (email) => {
  const userexist = await pool.query('SELECT * FROM users where email=$1', [email]);
  const existinguser = compare(userexist.rows[0].email, createdby);
  if (existinguser) {
    return userexist.rows[0];
  }
  return [];
}; */
export default {
  checkifUserExists,
  saveUser,
  ifuseralreadyexist,
  ifannouncementExist,
  saveAnnounce,
  // ifpostinguserexist,
};
