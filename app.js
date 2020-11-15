const inquirer = require("inquirer");
const express = require("express");
const table = require("console.table");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "qwerty1234",
    database: "employee_db",
});

connection.connect(function(err) {
    if (err) throw err;

    runPrompt();
});

// Run application
async function runPrompt() {

    // Main menu of node application
    function menu() {
        inquirer.prompt([
            {
                type: "list",
                message: "Menu",
                name: "menu",
                choices: [
                    "View All Employees",
                    "View All Employees By Department",
                    "View All Employees By Manager",
                    "Add Employees",
                    "Remove Employee",
                    "Update Role",
                    "View All Roles",
                    "View All Departments",
                    "View All Managers",
                    "Exit"
                ]
            }
        ]).then(function(data) {    // Input choices basic function mapping
            if (data.menu === "View All Employees") return viewAllEmployees();
            if (data.menu === "View All Employees By Department") return viewAllDep();
            if (data.menu === "View All Employees By Manager") return viewAllManager();
            if (data.menu === "Add Employees") return addEmployee();
            if (data.menu === "Remove Employee") return removeEmployee();
            if (data.menu === "Update Role") return updateRole();
            if (data.menu === "View All Roles") return viewAllRoles();
            if (data.menu === "View All Departments") return viewAllDepartments();
            if (data.menu === "View All Managers") return viewAllManagers();
            if (data.menu === "Exit") return exit();        
        });
    };

    // Show all employees
    function viewAllEmployees() {
        console.log("\nHere are some Employees\n");
        connection.query("SELECT * FROM employee", function(err, res) {
            if (err) throw err;

            console.table(res);
            inquirer.prompt([
                {
                    type: "list",
                    message: "What Next?",
                    name: "next",
                    choices: [
                        "Go Back",
                        "Add Employee",
                        "Remove Employee"
                    ]
                }
            ]).then(function(data) {
                if (data.next === "Go Back") return menu();
                if (data.next === "Add Employee") return addEmployee();
                if (data.next === "Remove Employee") return removeEmployee();
            })
        })
    };

    // Show all employees according to department
    function viewAllDep() {
        console.log("\nHere are some Departments\n");

        inquirer.prompt([
            {
                type: "list",
                message: "Select Department",
                name: "department",
                choices: [
                    "Management",
                    "Finance",
                    "Legal",
                    "HR",
                    "Sales",
                    "Go Back"
                ]
            }
        ]).then(function(data) {
            // MNAGEMENT
            if (data.department === "Management") 
                return connection.query(
                    "SELECT DISTINCT employee.first_name, employee.last_name FROM employee, employee_role WHERE employee.manager_id = employee_role.department_id AND employee_role.department_id = 1", 
                    function(err, res) {
                        if (err) throw err;
                        
                        console.table(res);
                        whatNext();
                    });
            // FINANCE DEPT
            if (data.department === "Finance") 
                return connection.query(
                    "SELECT DISTINCT employee.first_name, employee.last_name FROM employee, employee_role WHERE employee.manager_id = employee_role.department_id AND employee_role.department_id = 2", 
                    function(err, res) {
                        if (err) throw err;
                        
                        console.table(res);
                        whatNext();
                    });
            // LEGAL DEPT
            if (data.department === "Legal")
                return connection.query(
                    "SELECT DISTINCT employee.first_name, employee.last_name FROM employee, employee_role WHERE employee.manager_id = employee_role.department_id AND employee_role.department_id = 3", 
                    function(err, res) {
                        if (err) throw err;

                        console.table(res);
                        whatNext();
                    });
            // HR DEPT
            if (data.department === "HR")
                return connection.query(
                    "SELECT DISTINCT employee.first_name, employee.last_name FROM employee, employee_role WHERE employee.manager_id = employee_role.department_id AND employee_role.department_id = 4", 
                    function(err, res) {
                        if (err) throw err;

                        console.table(res);
                        whatNext();
                    });
            // SALES DEPT
            if (data.department === "Sales")
                return connection.query(
                    "SELECT DISTINCT employee.first_name, employee.last_name FROM employee, employee_role WHERE employee.manager_id = employee_role.department_id AND employee_role.department_id = 5", 
                    function(err, res) {
                        if (err) throw err;

                        console.table(res);
                        whatNext();
                    });
            // GO BACK
            if (data.department === "Go Back") return menu();
        });
        
    };

    // Show all employees according to their manager
    function viewAllManager() {
        console.log("\nHere are some Managers\n");

        inquirer.prompt([
            {
                type: "list",
                message: "Select Manager",
                name: "managers",
                choices: [
                    "Finance Manager",
                    "Legal Manager",
                    "HR Manager",
                    "Sales Manager",
                    "Go Back"
                ]
            }
        ]).then(function(data) {
            if (data.managers === "Finance Manager")
                return connection.query("SELECT DISTINCT employee.first_name, employee.last_name, employee.manager_id FROM employee, employee_role WHERE employee.manager_id = 2",
                function(err, res) {
                    if (err) throw err;

                    console.table(res);
                    back();
                });
            if (data.managers === "Legal Manager")
                return connection.query("SELECT DISTINCT employee.first_name, employee.last_name, employee.manager_id FROM employee, employee_role WHERE employee.manager_id = 3",
                function(err, res) {
                    if (err) throw err;

                    console.table(res);
                    back();
                });
            if (data.managers === "HR Manager")
                return connection.query("SELECT DISTINCT employee.first_name, employee.last_name, employee.manager_id FROM employee, employee_role WHERE employee.manager_id = 4",
                function(err, res) {
                    if (err) throw err;

                    console.table(res);
                    back();
                });
            if (data.managers === "Sales Manager")
                return connection.query("SELECT DISTINCT employee.first_name, employee.last_name, employee.manager_id FROM employee, employee_role WHERE employee.manager_id = 5",
                function(err, res) {
                    if (err) throw err;

                    console.table(res);
                    back();
                });
            if (data.managers === "Go Back") return menu();
        });
    };

    // Add employees to departments or assign to manager
    function addEmployee() {
        console.log("\nAdding Employee\n");

        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "First Name"
            },
            {
                type: "input",
                name: "lastName",
                message: "Last Name"
            },
            {
                type: "input",
                name: "department",
                message: "Department ID"
            },
            {
                type: "input",
                name: "manager",
                message: "Manager ID"
            }
        ]).then(function(data) {
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '${data.department}', '${data.manager}')`, 
                function(err, res) {
                    if (err) throw err;

                    console.log(`${data.firstName} ${data.lastName} has been added to department ${data.department}`);

                    inquirer.prompt([
                        {
                            type: "list",
                            message: "What Next?",
                            name: "next",
                            choices: [
                                "Go Back",
                                "View Employees",
                                "Add Another Employee"
                            ]
                        }
                    ]).then(function(data) {
                        if (data.next === "Go Back") return menu();
                        if (data.next === "View Employees") return viewAllEmployees();
                        if (data.next === "Add Another Employee") return addEmployee();
                    })
                });
        })
    };

    // Remove employees from the database
    function removeEmployee() {
        console.log("\nRemoving Employee\n");

        connection.query("SELECT id, first_name, last_name, role_id FROM employee", function(err, res) {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    message: "Select Employee",
                    name: "removal",
                    // loop: false,
                    choices: 
                        function() {
                            let employeeArray = [];
                            for (let i = 0; i < res.length; i++) {
                                employeeArray.push(`ID : ${res[i].id} ---- Role ID: ${res[i].role_id} ---- Name: ${res[i].first_name} ${res[i].last_name}`);
                            }
                            return employeeArray;
                        },
                }                
            ]).then(function(data) {
                let deleteEmployee = JSON.stringify(data.removal);

                let fired = deleteEmployee.slice(5, 8);

                if (data.removal === data.removal) {
                    connection.query("DELETE FROM employee WHERE id = " + fired, function(err, res) {
                        if (err) throw err;
                
                        console.log(`${data.removal} HAS BEEN REMOVED`);

                        inquirer.prompt([
                            {
                                type: "list",
                                message: "What Next?",
                                name: "next",
                                choices: [
                                    "Go Back",
                                    "View Employees",
                                    "Add Another Employee"
                                ]
                            }
                        ]).then(function(data) {
                            if (data.next === "Go Back") return menu();
                            if (data.next === "View Employees") return viewAllEmployees();
                            if (data.next === "Remove Another Employee") return removeEmployee();
                        });
                    });

                };
            });
        });
    };

    // Update employee role (ie promotion/demotion etc)
    function updateRole() {
        console.log("\nUpdating Role\n");

        connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee_role.title FROM employee INNER JOIN employee_role ON employee.role_id = employee_role.id", function(err, res) {
            if (err) throw err;

            inquirer.prompt([
                {
                    type: "list",
                    message: "What would you like to do?",
                    name: "selection",
                    choices: [
                        "Assign Employee To New Department",
                        "Go Back"
                    ]
                }
            ]).then(function(data) {
                if (data.selection === "Go Back") return menu();
                if (data.selection === "Assign Employee To New Department") {
                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Which Employee Is Moving?",
                            name: "selection",
                            choices: function() {
                                let employeeArray = [];
                                for (let i = 0; i < res.length; i++) {
                                    employeeArray.push(`ID: ${res[i].id} ---- Role ID: ${res[i].role_id} ---- Name: ${res[i].first_name} ${res[i].last_name}`);
                                }
                                return employeeArray;
                            }
                        }
                    ]).then(function(data) {
                        if (data.selection === data.selection) {
                            let movingEmployee = JSON.stringify(data.selection);
                            let movingStr = movingEmployee.slice(4,7);
                            console.log(movingStr);
                            connection.query(`SELECT title, id FROM employee_role`, function(err, res) {
                                if (err) throw err;

                                inquirer.prompt([
                                    {
                                        type: "list",
                                        message: "Which Department Are They Moving Too",
                                        name: "selection",
                                        choices: function() {
                                            let employeeArray = [];
                                            for (let i = 0; i < res.length; i++) {
                                                employeeArray.push(`ID: ${res[i].id} --- DEPARTMENT: ${res[i].title}`);
                                            }
                                            return employeeArray;
                                        }
                                    }
                                ]).then(function(data) {
                                    console.log(data);
                                    if (data.selection === data.selection) {

                                        let employeeMoving = JSON.stringify(data.selection);
                                        let employeeStr = employeeMoving.slice(4,7);

                                        console.log(employeeStr);
                                        connection.query(`UPDATE employee SET role_id = ${employeeStr} WHERE id = ${movingStr}`,function(err, res) {
                                            if (err) throw err;

                                            console.log("SUCCESS")
                                            inquirer.prompt([
                                                {
                                                    type: "list",
                                                    message: "What Next?",
                                                    name: "next",
                                                    choices: [
                                                        "Go Back",
                                                        "View Employees",
                                                        "Update Another Employee"
                                                    ]
                                                }
                                            ]).then(function(data) {
                                                if (data.next === "Go Back") return menu();
                                                if (data.next === "View Employees") return viewAllEmployees();
                                                if (data.next === "Update Another Employee") return updateRole();
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                }
            })
        })
    };

    function viewAllRoles() {
        console.log("\nSee all the Roles\n");

        connection.query("SELECT * FROM employee_role", function(err, res) {
            if (err) throw err;

            console.table(res);
            inquirer.prompt([
                {
                    type: "list",
                    message: "What Next?",
                    name: "next",
                    choices: [
                        "Go Back",
                        "Add Employee",
                        "Remove Employee"
                    ]
                }
            ]).then(function(data) {
                if (data.next === "Go Back") return menu();
                if (data.next === "Add Employee") return addEmployee();
                if (data.next === "Remove Employee") return removeEmployee();
            })
        })
    };

    // Search through departments and make changes from there
    function viewAllDepartments() {
        console.log("\nSee all the Departments\n");

        connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;

            console.table(res);
            inquirer.prompt([
                {
                    type: "list",
                    message: "What Next?",
                    name: "next",
                    choices: [
                        "Go Back",
                        "Add Employee",
                        "Remove Employee"
                    ]
                }
            ]).then(function(data) {
                if (data.next === "Go Back") return menu();
                if (data.next === "Add Employee") return addEmployee();
                if (data.next === "Remove Employee") return removeEmployee();
            })
        })
    };

    // Show all managers and view/update info from there
    function viewAllManagers() {
        console.log("\nSee all the Managers\n");

        connection.query("SELECT DISTINCT employee_role.title, employee.first_name, employee.last_name FROM employee, employee_role WHERE employee_role.id = employee.role_id AND employee_role.department_id = 1", 
        function(err, res) {
            if (err) throw err;

            console.table(res);
            inquirer.prompt([
                {
                    type: "list",
                    message: "What Next?",
                    name: "next",
                    choices: [
                        "Go Back?",
                    ]
                }
            ]).then(function(data) {
                if (data.next === "Go Back?") return menu();
            })
        })
    };

    // Leave the application
    function exit() {
        console.log("\nGet Outta Here!\n")
        connection.end();
    };
    
    // Global "WHAT NEXT" function
    async function whatNext() {
        inquirer.prompt([
            {
                type: "list",
                message: "What Now?",
                name: "next",
                choices: [
                    "Add Employee to Department",
                    "Remove Employee from Department",
                    "Go Back"
                ]
            }
        ]).then(function(data) {
            if (data.next === "Add Employee to Department") return addEmployee();
            if (data.next === "Remove Employee from Department") return removeEmployee();
            if (data.next === "Go Back") return menu();
        });
    };

    // Global "GO BACK" function
    async function back() {
        inquirer.prompt([
            {
                type: "list",
                message: "Go Back?",
                name: "back",
                choices: [
                    "Go Back",
                    "Main Menu"
                ]
            }
        ]).then(function(data) {
            if (data.back === "Go Back") return viewAllManager();
            if (data.back === "Main Menu") return menu();
        });
    };

    // Call the initial application
    menu();
}