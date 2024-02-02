const inquirer = require('inquirer');
const mySql = require('mysql2');

class CLI {
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
        .then(({ option }) => {
          this.option = option;
          switch (this.option) {
            case 'View All Employees':
              const circle = new Circle(this.txt, this.txtColor, this.shapeColor);
              this.shapeSvgCode = circle.render();
              this.txtSvgCode = circle.renderTxtCode();
              break;
            case 'Add Employee':
              const triangle = new Triangle(this.txt, this.txtColor, this.shapeColor);
              this.shapeSvgCode = triangle.render();
              this.txtSvgCode = triangle.renderTxtCode();
              break;
            case 'Update Employee Role':
              const square = new Square(this.txt, this.txtColor, this.shapeColor);
              this.shapeSvgCode = square.render();
              this.txtSvgCode = square.renderTxtCode();
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
  }

module.exports = CLI;