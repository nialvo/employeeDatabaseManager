const inquirer = require('inquirer');
require('console.table');
const db = require('../db/db.js')


const Queries = require('./queries.js');
const queries = new Queries();

const menu=["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"];

function Prompts(){}

Prompts.prototype.init=()=>{

    return inquirer.prompt([{

            type: "checkbox",
            name: "choice",
            message: "What would you like to do?",
            choices: menu,
        }

    ]).then((A)=>{

        switch (A.choice[0]) {
            case menu[0]: queries.departments(); break;
            case menu[1]: queries.roles(); break;
            case menu[2]: queries.employees(); break;
            case menu[3]: Prompts.prototype.addDepartment(); break;
            case menu[4]: Prompts.prototype.addRole(); break;
            case menu[5]: Prompts.prototype.addEmployee(); break;
            case menu[6]: Prompts.prototype.updateEmployeeRole(); break;
        }
        //Prompts.prototype.init(); //This is all funky , whyy?

    });

}




module.exports = Prompts;

