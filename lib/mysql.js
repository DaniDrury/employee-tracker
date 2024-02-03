import mysql from 'mysql2/promise';

// Connect to database
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mOr3StrOngPw$1!',
    database: 'employee_db'
  }
);

export class DB_command {
  async select_emp() {
    try {
      const [results] = await db.query(
        `SELECT e.id, e.first_name, e.last_name, title, d.name AS department, salary, concat(f.first_name,' ',f.last_name) AS manager
        FROM employee AS e
        JOIN role AS r 
          ON r.id = e.role_id
        JOIN department AS d 
          ON d.id = r.department_id
        LEFT JOIN employee AS f 
          ON f.id = e.manager_id
        ORDER BY e.id;`
      );
    return results;
    } 
    catch (err) {
      console.log(err);
    }
  };

  async select_dept() {
    try {
      const [results] = await db.query(
        `SELECT * FROM department;`
      );
    return results;
    } 
    catch (err) {
      console.log(err);
    }
  };

  async select_roles() {
    try {
      const [results] = await db.query(
        `SELECT * FROM department;`
      );
    return results;
    } 
    catch (err) {
      console.log(err);
    }
  };
};

