import db from "../config/connection.js";
// for creating formatted cli tables
import Table from 'cli-table';

export default class Employee {
  // constructor(id, first_name, last_name, role_id, manager_id) {
  //   this.id = id,
  //   this.first_name = first_name,
  //   this.last_name = last_name,
  //   this.rolde_id = role_id,
  //   this.manager_id = manager_id
  // };

  static async select_emp() {
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

  static async select_managers() {
    try {
      const [results] = await db.query(
        `SELECT id, concat(e.first_name,' ',e.last_name) AS manager
          FROM employee AS e
          WHERE manager_id IS NULL;`
      );
      return results;
    }
    catch (err) {
      console.log(err);
    }
  };

  static async add_emp(
    firstName,
    lastName,
    empRole,
    empManager,
    roles,
    managers) {

    // get role_id based on empRole selection
    let role_id;

    for (let i = 0; i < roles.length; i++) {
      const {
        id,
        title
      } = roles[i];

      if (title === empRole) {
        role_id = id;
      }
    };

    // get manager_id based on empManager selection
    let manager_id;

    if (empManager === "None") {
      manager_id = "";
    } else {
      for (let i = 0; i < managers.length; i++) {
        const {
          id,
          manager
        } = managers[i];

        if (manager === empManager) {
          manager_id = id;
        }
      };
    }
    // sql request to add new employee
    try {
      const [results] = await db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
          VALUES ("${firstName}", "${lastName}", "${role_id}", "${manager_id}");`
      );
    }
    catch (err) {
      console.log(err);
    }
  };

  static async update_emp(empName, newRole, empList, roleList) {
    // get id based on empName
    let id;

    for (let i = 0; i < empList.length; i++) {
      const {
        id,
        first_name,
        last_name
      } = empList[i];

      if (empName.split(' ')[0] === first_name &&
        empName.split(' ')[1] === last_name) {
        role_id = id;
      }
    };
    console.log(id);
    // get role_id based on newRole selection
    let role_id;

    for (let i = 0; i < roleList.length; i++) {
      const {
        id,
        title
      } = roleList[i];

      if (title === newRole) {
        role_id = id;
      }
    };
    console.log(role_id);
    // sql request to add new employee
    try {
      const [results] = await db.query(
        `UPDATE employee
          SET role_id = ${role_id}
          WHERE id = ${id};`
      );
    }
    catch (err) {
      console.log(err);
    };
  };

  static renderTable(empArr) {
    // create new Table object, set column headers and default row widths
    const table = new Table({
      head: ["ID", "First Name", "Last Name", "Job Title", "Department", "Salary", "Manager"]
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