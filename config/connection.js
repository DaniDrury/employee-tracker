import mysql from "mysql2/promise";
import dotenv from "dotenv";

const db = await mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 3306
});

export default db;

// import mysql from "mysql2/promise";

// let db;

// try {
//   const { DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

//   db = await mysql.createConnection(
//     `mysql://${DB_USER}:${DB_PASSWORD}@localhost:3306/${DB_DATABASE}`
//   );
// } catch (error) {
//   console.log(error);
// }

// export default db;
