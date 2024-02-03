import inquirer from 'inquirer';
import { DB_command } from './mysql.js';
// import { Employee } from './tables.js';

// const mySql = require('mysql2');

// function render_employees (empArr) {
//   // console.log('');
//   // console.log('');
//   // console.log('id  first_name  last_name  title               department   salary  manager');
//   // console.log('--  ----------  ---------  ------------------  -----------  ------  ----------------');
//   // console.table(empArr);
//   for (let i = 0; i < empArr.length; i++) {
//     const {
//       id,
//       first_name,
//       last_name,
//       title,
//       department,
//       salary,
//       manager
//     } = empArr[i];
//     console.table(empArr[i]);
//     // console.table(id, first_name, last_name, title, department, salary, manager);    
//   }
// };

export default class CLI {
  run() {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'main_menu',
          message: 'What would you like to do?',
          choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
          ],
          default: 'View All Employees'
        }
      ])
      .then(async ({ main_menu }) => {
        switch (main_menu) {
          case 'View All Employees':
            const employees = await new DB_command().select_emp();
            console.table(employees);
            this.run();
            break;  
          case 'Add Employee':
            console.log('this');
            break;
          case 'Update Employee Role':
            console.log('this');
            break;
          case 'View All Roles':
            break;
          case 'Add Role':
            break;
          case 'View All Departments':
            const department = await new DB_command().select_dept();
            console.table(department);
            break;
          case 'Add Department':
            break;
          case 'Quit':
            break;
          default:
            throw new Error('Option was not identified.');
        }
      });
  };
};
