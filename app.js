const inquirer = require("inquirer");
const express = require("express");
const table = require("console.table");
const path = require("path");
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
                    "Update Manager",
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
            if (data.menu === "Update Manager") return updateManager();
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
                        "Return",
                        "Add Employee",
                        "Remove Employee"
                    ]
                }
            ]).then(function(data) {
                if (data.next === "Return") return menu();
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
                    "Finance",
                    "legal",
                    "HR",
                    "Sales",
                    "Go Back"
                ]
            }
        ]).then(function(data) {
            if (data.department === "Finance") 
                return connection.query(
                    "SELECT employee.first_name, employee.last_name, department.department_name FROM employee, department WHERE employee.role_id = employee.role_id AND department.department_name = 'Finance'", function(err, res) {
                        if (err) throw err;

                        
                        console.table(res);
                    });
                
        });
        
    };

    // Show all employees according to their manager
    function viewAllManager() {
        console.log("\nHere are some Managers\n");
    };

    // Add employees to departments or assign to manager
    function addEmployee() {
        console.log("\nAdding Employee\n");
    };

    // Remove employees from the database
    function removeEmployee() {
        console.log("\nRemoving Employee\n");
    };

    // Update employee role (ie promotion/demotion etc)
    function updateRole() {
        console.log("\nUpdating Role\n");
    };

    // Update manager (assign new employee to manager role)
    function updateManager() {
        console.log("\nUpdating Managers\n");
    };

    function viewAllRoles() {
        console.log("\nSee all the Roles\n");
    };

    // Search through departments and make changes from there
    function viewAllDepartments() {
        console.log("\nSee all the Departments\n");
    };

    // Show all managers and view/update info from there
    function viewAllManagers() {
        console.log("\nSee all the Managers\n");
    };

    // Leave the application
    function exit() {
        console.log("\nGet Outta Here!\n")
        connection.end();
    };

    // Call the initial application
    menu();
}