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
        const deptData = await Department.select_dept();
        // const deptData = [];
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
        const roleData = await Role.select_all_roles();
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
      case 'View All Employees': {
        const empData = await Employee.select_emp();
        Employee.renderTable(empData);
        break;};
      case 'Add Employee':{
        // creating roles list for Roles prompt list choices
        const roles = await Role.select_all_roles();
        const rolesList = [];
        
        for (let i = 0; i < roles.length; i++) {
          const {
            title
          } = roles[i];
          rolesList.push(title);
        };

        prompts.addEmp[2].choices = rolesList;

        // creating managers list for Manager prompt list choices
        const managers = await Employee.select_managers();
        const managersList = [];
        
        for (let i = 0; i < managers.length; i++) {
          const {
            manager
          } = managers[i];
          managersList.push(manager);
        };

        managersList.push('None');

        prompts.addEmp[3].choices = managersList;

        // call addEmpl prompt and destructure responses
        const {
          firstName,
          lastName,
          empRole,
          empManager
        } = await inquirer.prompt(prompts.addEmp);
        // call add employee static class method
        Employee.add_emp(firstName,lastName,empRole,empManager,roles,managers);
        console.log(`\nNew employee, ${firstName} ${lastName}, has been added.`)
        break;};
      case 'Update Employee Role':{
        // create Employees list for list prompt choices
        const employees = await Employee.select_emp();
        const updateEmpList = [];
        
        for (let i = 0; i < employees.length; i++) {
          const {
            first_name,
            last_name
          } = employees[i];
          updateEmpList.push(first_name + ' ' + last_name);
        };        
      
        // create Roles list for list prompt choices
        const roles = await Role.select_all_roles();
        const updateRoleList = [];
        
        for (let i = 0; i < roles.length; i++) {
          const {
            title
          } = roles[i];
          updateRoleList.push(title);
        };

        // assign lists to prompt choices
        prompts.updateEmp[0].choices = updateEmpList;
        prompts.updateEmp[1].choices = updateRoleList;

        const { empName, newRole } = await inquirer.prompt(prompts.updateEmp);
        Employee.update_emp(empName, newRole, employees, roles);
        console.log(`Employee, ${empName}'s, role has been updated to ${newRole}.`);
        break;};
      case 'View All Roles':{
        const roleData = await Role.select_all_roles();
        Role.renderTable(roleData);
        break;};
      case 'Add Role':{
      // get list of departments to create Dept list for prompt
        const depts = await Department.select_dept();
      // create array of department names only
        const deptList = [];
        
        for (let i = 0; i < depts.length; i++) {
          const {
            name
          } = depts[i];
          deptList.push(name);
        };
        // set the list of department names as the choices option 
        // in the addRole prompt list
        prompts.addRole[2].choices = deptList;

        const { roleName, roleDept, roleSalary } = await inquirer.prompt(prompts.addRole);
        Role.add_role(roleName, roleDept, roleSalary, depts);
        console.log(`Added ${roleName} to the database.`);
        break;};
      case 'View All Departments':{
        const deptData = await Department.select_dept();
        Department.renderTable(deptData);
        break;};
      case 'Add Department':{
        const { deptName } = await inquirer.prompt(prompts.addDept);
        Department.add_dept(deptName);
        console.log(`Added ${deptName} to the database.`);
        break;};
      case 'Quit':{
        return process.exit(0);};
      default:
        {throw new Error('Option was not identified.');};
    }
    return this.run();
  };
};