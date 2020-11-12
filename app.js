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

async function runPrompt() {

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
        ]).then(function(data) {
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

    function viewAllDep() {
        console.log("\nHere are some Departments\n");
        connection.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;

            console.table(res);

        })
    };

    function viewAllManager() {
        console.log("\nHere are some Managers\n");
    };

    function addEmployee() {
        console.log("\nAdding Employee\n");
    };

    function removeEmployee() {
        console.log("\nRemoving Employee\n");
    };

    function updateRole() {
        console.log("\nUpdating Role\n");
    };

    function updateManager() {
        console.log("\nUpdating Managers\n");
    };

    function viewAllRoles() {
        console.log("\nSee all the Roles\n");
    };

    function viewAllDepartments() {
        console.log("\nSee all the Departments\n");
    };

    function viewAllManagers() {
        console.log("\nSee all the Managers\n");
    };

    function exit() {
        console.log("\nGet Outta Here!\n")
        connection.end();
    };

    menu();
}