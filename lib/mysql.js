import mysql from 'mysql2/promise';

// Connect to database
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mOr3StrOngPw$1!',
    database: 'employee_db'
  }
);

// DB_command Class holding methods for each required mySql command
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
        `SELECT r.id AS id, title, d.name AS department, salary
        FROM role AS r
        JOIN department AS d
          ON d.id = r.department_id;`
      );
    return results;
    } 
    catch (err) {
      console.log(err);
    }
  };

  async add_empl() {
    try {
      const [results] = await db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (first_name, last_name, role_id, manager_id);`
      );
    // is this needed?
    return results;
    } 
    catch (err) {
      console.log(err);
    }
  };
};

