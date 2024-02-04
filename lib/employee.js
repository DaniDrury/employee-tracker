import mysql from 'mysql2/promise';
import Table from 'cli-table';

// Connect to database
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mOr3StrOngPw$1!',
    database: 'employee_db'
  }
);

export default class Employee {
  constructor(id, first_name, last_name, role_id, manager_id) {
    this.id = id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.rolde_id = role_id,
    this.manager_id = manager_id
  };

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

  renderTable(empArr) {
    // create new Table object, set column headers and default row widths
    const table = new Table({
      head: ["ID", "First Name", "Last Name", "Job Title", "Department", "Salary", "Manager"],
      colWidth: [50, 100, 100, 100, 100, 100, 100]
    });
    
    // loop through employee array to destructure and add data to table
    for (let i = 0; i < empArr.length; i++) {
      // destructure employee objects
      let {
        id,
        first_name,
        last_name,
        title,
        department,
        salary,
        manager
      } = empArr[i];

      // null value interferes with table construction, therefore set to "none" string
      if (!manager) {
        manager = 'none';
      };

      // push values to table
      table.push(
        [
          id,
          first_name,
          last_name,
          title,
          department,
          salary,
          manager
        ]
      );
    }
    // log table
    console.log(table.toString());
  };
};