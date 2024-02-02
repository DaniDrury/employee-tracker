import mysql from 'mysql2/promise';

// Connect to database
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mOr3StrOngPw$1!',
    database: 'employee_db'
  }
  // console.log(`Connected to the courses_db database.`)
);

export class DB_command {
  async select(table) {
    console.log(table);
    try {
      const [results] = await db.query(
        `SELECT * FROM ${table};`
      );
    console.log(results);
    } 
    catch (err) {
      console.log(err);
    }
  };
};