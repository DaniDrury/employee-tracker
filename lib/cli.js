import inquirer from 'inquirer';
import Employee from './employee.js';
import Department from './department.js';
import Role from './role.js';

export default class CLI {
  async run() {
    await inquirer
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
      .then (async (option)) => {
      switch (option) {
        case 'View All Employees':
          const empData = await new Employee().select_emp();
          new Employee().renderTable(empData);
          this.run();
          break;
        case 'Add Employee':
          // needs new inquirer prompt - put these into their own Class?
          // return inquirer
          // .prompt([
          // ]);
          break;
        case 'Update Employee Role':
          console.log('this');
          break;
        case 'View All Roles':
          const roleData = await new Role().select_roles();
          new Role().renderTable(roleData);
          this.run();
          break;
        case 'Add Role':
          break;
        case 'View All Departments':
          const deptData = await new Department().select_dept();
          new Department().renderTable(deptData);
          this.run();
          break;
        case 'Add Department':
          break;
        case 'Quit':
          break;
        default:
          throw new Error('Option was not identified.');
      }
    };
  };
};
// .then ((res) => {
//   if (!res) {
//     // shouldn't need this -- code should exit naturally... But how?
//     // process.exit();
//     // Clearly there is something outstanding - a promise hanging
//     console.log('End Employee Database Search');
//   }
// });