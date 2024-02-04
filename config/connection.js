// mysql2 promise package
import mysql from 'mysql2/promise';

let db;

// Connect to database
try {
db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mOr3StrOngPw$1!',
  database: 'employee_db'
});
} catch(err) {
  console.log(err);
};

export default db;