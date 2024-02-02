import inquirer from 'inquirer';
import { DB_command } from './mysql.js';

// const mySql = require('mysql2');

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
      .then(({ main_menu }) => {
        // this.option = option;
        switch (main_menu) {
          case 'View All Employees':
            const employees = new DB_command().select('employee');
            break;
          case 'Add Employee':
            break;
          case 'Update Employee Role':
            break;
          case 'View All Roles':
            break;
          case 'Add Role':
            break;
          case 'View All Departments':
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
