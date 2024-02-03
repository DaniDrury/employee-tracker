import inquirer from 'inquirer';
import { DB_command } from './mysql.js';

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
            return await new DB_command().select_emp();
            break;  
          case 'Add Employee':
            // needs new inquirer prompt - put these into their own Class?
            return inquirer
            .prompt([

            ]);
            break;
          case 'Update Employee Role':
            console.log('this');
            break;
          case 'View All Roles':
            return await new DB_command().select_roles();
            break;
          case 'Add Role':
            break;
          case 'View All Departments':
            return await new DB_command().select_dept();
            break;
          case 'Add Department':
            break;
          case 'Quit':
            break;
          default:
            throw new Error('Option was not identified.');
        }
      })
      .then ((res) => {
        if (res) {
          console.table(res);
          this.run();
        } else {
          // shouldn't need this -- code should exit naturally... But how?
          // process.exit();
          // Clearly there is something outstanding - a promise hanging
          console.log('End Employee Database Search');
        }
      });
  };
};
