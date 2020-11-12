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
        console.log("Here are some Employees");
    };

    function viewAllDep() {
        console.log("Here are some Departments");
    };

    function viewAllManager() {
        console.log("Here are some Managers");
    };

    function addEmployee() {
        console.log("Adding Employee");
    };

    function removeEmployee() {
        console.log("Removing Employee");
    };

    function updateRole() {
        console.log("Updating Role");
    };

    function updateManager() {
        console.log("Updating Managers");
    };

    function viewAllRoles() {
        console.log("See all the Roles");
    };

    function viewAllDepartments() {
        console.log("See all the Departments");
    };

    function viewAllManagers() {
        console.log("See all the Managers");
    };

    function exit() {
        console.log("Get Outta Here!")
    };

    menu();
}