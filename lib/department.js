// mysql2 promise package
import mysql from 'mysql2/promise';
// for creating formatted cli tables
import Table from 'cli-table';

// Connect to database
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mOr3StrOngPw$1!',
    database: 'employee_db'
  }
);

export default class Department {
  constructor(id, name) {
    this.id = id,
    this.name = name
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

  async add_dept() {
    try {
      const [results] = await db.query(
        `INSERT INTO department (title)
        VALUES (?), title;`
      );
    // is this needed?
    return results;
    } 
    catch (err) {
      console.log(err);
    }
  };

  renderTable(deptArr) {
    // create new Table object, set column headers and default row widths
    const table = new Table({
      head: ["ID", "Department"],
      colWidth: [50, 100]
    });

    // loop through employee array to destructure and add data to table
    for (let i = 0; i < deptArr.length; i++) {
      // destructure employee objects
      let {
        id,
        name
      } = deptArr[i];

      // push values to table
      table.push(
        [
          id,
          name
        ]
      );
    }
    // log table
    console.log(table.toString());
  };
};