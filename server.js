const inquirer = require('inquirer');
// const mysql = require('mysql2');
const db = require('./config/connection')

// this is the startMenu with the list for every function
const startMenu = {
    name: "functionality",
    message: "Hello, welcome to employee manager, what would you like to do?",
    type: "list",
    choices: [
        "Add Employee",
        "Update Employee",
        "Show All Employees",
        "Delete an Employee",
        "View All Deparment",
        "Add Department",
        "View All Roles",
        "Add a Role",
    ],
};

const showAllEmployees = () => {
    //make a call to the db, and show all employees
    db.query(`SELECT e1.id as EMP_ID, CONCAT(e1.first_name, ' ', e1.last_name) as Name, title as role, 
    salary, department.name as department, IFNULL(CONCAT(e2.first_name, ' ', e2.last_name), 'No Manager, Bawss Status') as Manager FROM employee e1 LEFT JOIN role 
    ON e1.role_id=role.id LEFT JOIN department ON role.department_id=department.id
    LEFT JOIN employee e2 ON e1.manager_id=e2.id `).then((results) => {
        console.log("--------------  EMPLOYEES  --------------");
        console.table(results);
        console.log("--------------  EMPLOYEES  --------------");

        setTimeout(start, 3000);
    });
};

// add employee
const addEmployee = () => {
    //before writing query, we need inquirer to gather info on new employee
    //we need all the current role ids, to allow user to choose a role_id that's in the role table,
    //we need all the current emp ids, to choose a manager_id
    db.query(`SELECT id, first_name, last_name FROM employee`).then(
        (managers) => {
            const managerChoices = managers.map((man) => {
                return {
                    name: `${man.first_name} ${man.last_name}`,
                    value: man.id,
                };
            });
            db.query(`SELECT id, title FROM role`).then((results) => {
                const choices = results.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    };
                });
                //convert results to a array of choices for inquirer prompt
                const addEmployeePrompt = [
                    {
                        name: "first_name",
                        message: "What is the employee's first name?",
                    },
                    {
                        name: "last_name",
                        message: "What is the employee's last name?",
                    },
                    {
                        name: "role_id",
                        message: "What is the employee's title?",
                        type: "list",
                        choices,
                    },
                    {
                        name: "manager_id",
                        message: "Who is this employee's manager?",
                        type: "list",
                        choices: [
                            ...managerChoices,
                            { name: "No Manager, this person is a bawss!", value: null },
                        ],
                    },
                ];

                inquirer.prompt(addEmployeePrompt).then((results) => {
                    console.log("RESULTS --- ", results);

                    db.query("INSERT INTO employee SET ?", results).then(() =>
                        setTimeout(start, 3000)
                    );
                });
            });
        }
    );
    // inquirer.prompt()
};

// add a department 

function addDepartment() {
    const addDepartmentQuestions = [
        {
            name: "name",
            message: "Enter department name",
        }
    ]
    inquirer.prompt(addDepartmentQuestions)
        .then(results => {
            // Add results to Department Table
            console.log(results)
            db.query('INSERT INTO department SET ?', results)
                .then(() => {
                    console.log('Department Added');
                    start()
                })
        }
        )
}

// show all department
const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        // console.log(results);
        if(err)throw err
        console.table(results);
        start()
    });
}


// show all roles
function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        if(err)throw err
        console.table(results); 
        start();
    });
}

// add a role
function addRole() {
            const addRoleQuestions = [
                {
                    name: "title",
                    message: "Enter title",
                },
                {
                    name: "salary",
                    message: "Enter salary",
                },
                {
                    name: "department_id",
                    message: "Enter role department id",
                    
                }
            ]
            inquirer.prompt(addRoleQuestions)
                .then(results => {
                    // Add results to Role Table
                    db.query('INSERT INTO role SET ?', results)
                        .then(() => {
                            console.log('Role Added');
                            start()
                        })
                })
        }

// the start of function which prompts the user for question and determines the tasks accordingly 
function start() {
 
    inquirer.prompt(startMenu).then((response) => {

      //based on user choice, we're going to maybe ask additional questions or do some db operation
      switch (response.functionality) {
        case "Show All Employees":
          return showAllEmployees();
        case "Add Employee":
          return addEmployee();
        case "Add Department":
          return addDepartment();
        case "View All Deparment":
          return viewAllDepartments();
        case "View All Roles":
            return viewAllRoles()
        case "Add a Role":
            return addRole()
         default:
            console.log("what you want me to do?");
      }
    });
}

start();
