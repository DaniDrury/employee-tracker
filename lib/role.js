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

export default class Role {
  constructor(id, title, department_id, salary) {
    this.id = id,
      this.title = title,
      this.dept_id = department_id,
      this.salary = salary
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

  async add_role(title, dept_id, salary) {
    console.log(this);
  }

  renderTable(roleArr) {
    // create new Table object, set column headers and default row widths
    const table = new Table({
      head: ["ID", "Title", "Department", "Salary"],
      colWidth: [50, 100, 100, 100]
    });

    // loop through employee array to destructure and add data to table
    for (let i = 0; i < roleArr.length; i++) {
      // destructure employee objects
      let {
        id,
        title,
        department,
        salary
      } = roleArr[i];

      // push values to table
      table.push(
        [
          id,
          title,
          department,
          salary
        ]
      );
    }
    // log table
    console.log(table.toString());
  };
};