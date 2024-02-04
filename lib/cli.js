import inquirer from 'inquirer';
import Employee from './employee.js';
import Department from './department.js';
import Role from './role.js';

const prompts = {
  mainMenu: [
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
  ],
  addDept: [
    {
      type: 'input',
      name: 'deptName',
      message: 'What is the name of the department?',
      validate: async (deptName) => {
        const deptData = await new Department().select_dept();
        for (const obj of deptData) {
          if (Object.values(obj).includes(deptName)) {
            console.log("\nThis department already exits.");
            return false;
          };
        };
        if (!deptName) {
          console.log("\nYou did not enter a valid name.");
          return false;
        }
        return true;
      }
    }
  ],
  addRole: [
    {
      type: 'input',
      name: 'roleName',
      message: 'What is the name of the new role?',
      validate: async (roleName) => {
        const roleData = await new Role().select_roles();
        for (const obj of roleData) {
          if (Object.values(obj).includes(roleName)) {
            console.log("\nThis role already exits.");
            return false;
          };
        };
        if (!roleName) {
          console.log("\nYou did not enter a valid name.");
          return false;
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the salary for this role?',
      validate: (roleSalary) => {
        if (!isNaN(roleSalary) && roleSalary > 0) {
          return true;
        } else {
          console.log('\nPlease enter a non-negative integer.');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'roleDept',
      message: 'Which department does this role belong to?',
      choices: [],
    }
  ],
  addEmp: [
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?",
      validate: (firstName) => {
        if (!firstName) {
          console.log('\nPlease enter a valid name.');
          return false;
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: (lastName) => {
        if (!lastName) {
          console.log('\nPlease enter a valid name.');
          return false;
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'empRole',
      message: "What is the employee's role?",
      choices: []
    },
    {
      type: 'list',
      name: 'empManager',
      message: "Who is the employee's manager?",
      choices: []
    }
  ],
  updateEmp: [
    {
      type: 'list',
      name: "empName",
      message: "Which employee's role do you want to update?",
      choices: []
    },
    {
      type: 'list',
      name: "newRole",
      message: "Which role would you like to assign the employee?",
      choices: []
    }
  ]
};

export default class CLI {
  async run() {
    const { main_menu } = await inquirer
      .prompt(prompts.mainMenu);

    switch (main_menu) {
      case 'View All Employees':
        const empData = await new Employee().select_emp();
        new Employee().renderTable(empData);
        this.run();
        break;
      case 'Add Employee':
        const {
          firstName,
          lastName,
          empRole,
          empManager
        } = await inquirer.prompt(prompts.addEmp);
        new Employee().add_emp(firstName,lastName,empRole,empManager);
        this.run();
        break;
      case 'Update Employee Role':
        const { empName, newRole } = await inquirer.prompt(prompts.updateEmp);
        new Employee().update_emp(empName,newRole);
        this.run();
        break;
      case 'View All Roles':
        const roleData = await new Role().select_roles();
        new Role().renderTable(roleData);
        this.run();
        break;
      case 'Add Role':
        const { rollName } = await inquirer.prompt(prompts.addRole);
        new Role().add_role(rollName);
        this.run();
        break;
      case 'View All Departments':
        const deptData = await new Department().select_dept();
        new Department().renderTable(deptData);
        this.run();
        break;
      case 'Add Department':
        const { deptName } = await inquirer.prompt(prompts.addDept);
        new Department().add_dept(deptName);
        this.run();
        break;
      case 'Quit':
        return process.exit(0);
      default:
        throw new Error('Option was not identified.');
    }
  };
};