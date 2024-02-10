// mysql2 promise package
import db from "../config/connection.js";
// for creating formatted cli tables
import Table from 'cli-table';

export default class Role {
  // constructor(id, title, department_id, salary) {
  //   this.id = id,
  //     this.title = title,
  //     this.dept_id = department_id,
  //     this.salary = salary
  // };

  static async select_all_roles() {
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

  static async add_role(title, dept, salary, deptList) {
    // get dept_id based on department selection
    let dept_id;

    for (let i = 0; i < deptList.length; i++) {
      const {
        id,
        name
      } = deptList[i];

      if (name === dept) {
        dept_id = id;
      }
    };

    // sql request to create new role
    try {
      const [results] = await db.query(
        `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${dept_id}");`
      );
    }
    catch (err) {
      console.log(err);
    }
  }

  static renderTable(roleArr) {
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