/* eslint-disable import/no-mutable-exports */
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

let connection = '';

// Production
if (process.env.DATABASE_URL) {
  connection = new pg.Pool({ connectionString: process.env.DATABASE_URL });
} else if (process.env.NODE_ENV === 'test') {
  // Testing env
  connection = new pg.Pool({ connectionString: process.env.TESTDBURL });
} else {
  // Development env
  // connection = new pg.Pool({ connectionString: process.env.DEVDBURL });
  connection = new pg.Pool({ connectionString: 'postgres://postgres:sego1ene@localhost:5432/announceit' });
  // console.log('===== ', connection);
}

export default connection;
