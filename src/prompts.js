const inquirer = require('inquirer');
require('console.table');
const db = require('../db/db.js')


const menu=["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "update an employee manager"];//, "view employees by manager"];

function Prompts(){}

Prompts.prototype.init=()=>{

    inquirer.prompt([{

            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: menu,
        }

    ]).then((A)=>{

        switch (A.choice) {
            
            case menu[0]: {//all departments: department names and department ids
                db.query('SELECT _name as Department, _id as ID  FROM _department;', function (err, res) {
                console.table(res);
                Prompts.prototype.init();
                });
            }; break;

            case menu[1]: {//all roles: job title, role id, the department that role belongs to, and the salary for that role
                db.query('SELECT _role._title as Title, _role._id as ID, _department._name as Department FROM _role  JOIN _department ON _role._department_id =_department._id ORDER BY _department._name;', function (err, res) {
                console.table(res);
                Prompts.prototype.init();
                });
            }; break;

            case menu[2]: {//all employees: employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
                db.query('SELECT A._id as ID, CONCAT(A._last_name,", ", A._first_name) as Name, _role._title as Title, _department._name as Department, _role._salary as Salary, CONCAT(B._last_name,", ", B._first_name) as Manager FROM _employee A LEFT JOIN _employee B ON A._manager_id = B._id  JOIN _role ON A._role_id =_role._id JOIN _department ON _role._department_id =_department._id ORDER BY A._last_name;', function (err, res) {//WHERE A._manager_id = B._id
                console.table(res);
                Prompts.prototype.init();
                });
            }; break;

            case menu[3]: {//add a department: prompted to enter the name of the department and that department is added to the database
                Prompts.prototype.addDepartment(); 
            }; break;

            case menu[4]: {//add a role: prompted to enter the name, salary, and department for the role and that role is added to the database
                Prompts.prototype.addRole(); 
            }; break;

            case menu[5]: {//add an employee: prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
                Prompts.prototype.addEmployee(); 
            }; break;

            case menu[6]: {//update an employee role: prompted to select an employee to update and their new role and this information is updated in the database
                Prompts.prototype.updateEmployeeRole(); 
            }; break;

            case menu[7]: {//update an employee manager: prompted to select an employee to update and their new manager and this information is updated in the database
                Prompts.prototype.updateEmployeeManager(); 
            }; break;

            case menu[8]: {//update an employee manager: prompted to select an employee to update and their new manager and this information is updated in the database
                Prompts.prototype.viewEmployeesByManager(); 
            }; break;

        }
    });
}

Prompts.prototype.addDepartment=()=>{//enter the name of the department and that department is added to the database

    inquirer.prompt([{

            type: "entry",
            name: "name",
            message: "What is the name of the new department?",
        
        }

    ]).then((A)=>{
        
        db.query('INSERT INTO _department (_name) VALUES (?);', A.name, function (err, res) {
            console.log(`New department ${A.name} added.`);
            Prompts.prototype.init();
        });

    });   
}

Prompts.prototype.addRole=()=>{//enter the name, salary, and department for the role and that role is added to the database
    
    const depts = [];

    db.query('SELECT _name  FROM _department;', function (err, res) {

        for(let i=0; i< res.length; i++) depts.push(res[i]._name);

        inquirer.prompt([{

                type: "input",
                name: "title",
                message: "What is the title of the new role?",
            },{
                type: "input",
                name: "salary",
                message: "What is the salary of the new role?",
                validate: (answer) => {
                    const pass = answer.match(/^[0-9]\d*$/);
                    if (pass) {
                      return true;
                    }
                    return 'Please enter a positive number.';
                },
            },{
                type: "list",
                name: "department",
                message: "Which department does the new role belong to?",
                choices: depts,
            }

        ]).then(({title,salary,department})=>{

            //get index of selected department
            const isIt = (element) => { return element == department}
            const ID = (depts.findIndex(isIt)+1).toString();//add 1 because array starts at 0 but departments start at 1

            db.query(`INSERT INTO _role (_title,_salary,_department_id) VALUES (?,?,?);`,[title,salary,ID], function (err, res) {
                console.log(`New role ${title} added to ${department} department.`);
                Prompts.prototype.init();
            });

        }) 
    })
}

Prompts.prototype.addEmployee=()=>{//enter the employee’s first name, last name, role, and manager, and that employee is added to the database

    const manas = [];
    const roles = [];

    db.query('SELECT CONCAT(_employee._last_name,", ", _employee._first_name) as Name  FROM _employee ;', function (err, res) {

        for(let i=0; i< res.length; i++) manas.push(res[i].Name);
        manas.unshift("NO MANAGER FOR THIS EMPLOYEE");


        db.query('SELECT _role._title FROM _role;', function (err, res) {
            
            for(let j=0; j< res.length; j++) roles.push(res[j]._title);
    
            inquirer.prompt([{
    
                    type: "input",
                    name: "first",
                    message: "What is the new employee's first name?",
                },{
                    type: "input",
                    name: "last",
                    message: "What is the new employee's last name?",
                },{
                    type: "list",
                    name: "title",
                    message: "What is the new employee's role?",
                    choices: roles,
                },{
                    type: "list",
                    name: "manager",
                    message: "Who is the new employee's manager?",
                    choices: manas,
                }
    
            ]).then(({first,last,title,manager})=>{

                let manager_ID;
    
                //get index of selected manager or set to NULL if the new employee does not have a manager
                if(manager == "NO MANAGER FOR THIS EMPLOYEE"){
                    manager_ID = null;
                }
                else{
                    const isIt2 = (element) => { return element == manager}
                    manager_ID = (manas.findIndex(isIt2)).toString();//do not add 1 because we unshifted "NO MANAGER"
                }
                

                //get index of selected role
                const isIt3 = (element) => { return element == title}
                const role_ID = (roles.findIndex(isIt3)+1).toString();//add 1 because array starts at 0 but table start at 1
    
                db.query(`INSERT INTO _employee (_first_name,_last_name,_role_id,_manager_id) VALUES (?,?,?,?);`,[first,last,role_ID,manager_ID], function (err, res) {
                    console.log(`New ${title}: ${last}, ${first} added to database.`);
                    Prompts.prototype.init();
                });
    
            }) 
        })   
    })
}

Prompts.prototype.updateEmployeeRole=()=>{//select an employee to update their role and this information is updated in the database
    const empls = [];
    const roles2 = [];

    db.query('SELECT CONCAT(_employee._last_name,", ", _employee._first_name) as Name  FROM _employee;', function (err, res) {

        for(let i=0; i< res.length; i++) empls.push(res[i].Name);

        db.query('SELECT _role._title FROM _role;', function (err, res) {
            
            for(let j=0; j< res.length; j++) roles2.push(res[j]._title);
    
            inquirer.prompt([{
    
                    type: "list",
                    name: "name",
                    message: "Which employee would you like to update?",
                    choices: empls,
                },{
                    type: "list",
                    name: "title",
                    message: "What is the employee's new role?",
                    choices: roles2,
                }
    
            ]).then(({name,title})=>{

                 

                
    
                //get index of selected employee 
                
                const isIt4 = (element) => { return element == name}
                const emp_ID = (empls.findIndex(isIt4)+1).toString();//add 1 because array starts at 0 but table start at 1
                
                

                //get index of selected role
                const isIt5 = (element) => { return element == title}
                const role_ID = (roles2.findIndex(isIt5)+1).toString();//add 1 because array starts at 0 but table start at 1
    
                db.query(`UPDATE _employee SET _role_id = ? WHERE _id = ?;`,[role_ID,emp_ID], function (err, res) {
                    console.log(`Role of ${name} updated to ${title}.`);
                    Prompts.prototype.init();
                });
    
            })  
        })   
    })
}

Prompts.prototype.updateEmployeeManager=()=>{//select an employee to update employee manager
    const empls2 = [];

    db.query('SELECT CONCAT(_employee._last_name,", ", _employee._first_name) as Name  FROM _employee;', function (err, res) {

        for(let i=0; i< res.length; i++) empls2.push(res[i].Name);
        const manas2 = empls2.slice();
        manas2.unshift("NO MANAGER FOR THIS EMPLOYEE");

    
    
        inquirer.prompt([{
    
                type: "list",
                name: "name",
                message: "Which employee would you like to update?",
                choices: empls2,
            },{
                type: "list",
                name: "manager",
                message: "Who is the employee's new manager?",
                choices: manas2,
            }
    
        ]).then(({name,manager})=>{

                
    
            //get index of selected employee 
                
            const isIt6 = (element) => { return element == name}
            const emp_ID = (empls2.findIndex(isIt6)+1).toString();//add 1 because array starts at 0 but table start at 1
               
            //get index of manager
            let mana_ID;

            if(manager == "NO MANAGER FOR THIS EMPLOYEE"){
                mana_ID = null;
            }
            else{
                const isIt7 = (element) => { return element == manager}
                mana_ID = (manas2.findIndex(isIt7)).toString();//do not add 1 because we unshifted "NO MANAGER"
            }
                

    
            db.query(`UPDATE _employee SET _manager_id = ? WHERE _id = ?;`,[mana_ID,emp_ID], function (err, res) {
                console.log(`Manager of ${name} updated to ${manager}.`);
                console.log(mana_ID,emp_ID);
                Prompts.prototype.init();
            });
    
        })  
         
    })
}


/*
Prompts.prototype.viewEmployeesByManager=()=>{//select a manager to view all their employees
    const empls2 = [];

    db.query('SELECT CONCAT(A._last_name,", ", _employee._first_name) as Name  FROM _employee;', function (err, res) {

        for(let i=0; i< res.length; i++) empls2.push(res[i].Name);
        const manas2 = empls2.slice();
        manas2.unshift("NO MANAGER FOR THIS EMPLOYEE");

    
    
        inquirer.prompt([{
    
                type: "list",
                name: "name",
                message: "Which employee would you like to update?",
                choices: empls2,
            },{
                type: "list",
                name: "manager",
                message: "Who is the employee's new manager?",
                choices: manas2,
            }
    
        ]).then(({name,manager})=>{

                
    
            //get index of selected employee 
                
            const isIt6 = (element) => { return element == name}
            const emp_ID = (empls2.findIndex(isIt6)+1).toString();//add 1 because array starts at 0 but table start at 1
               
            //get index of manager
            let mana_ID;

            if(manager == "NO MANAGER FOR THIS EMPLOYEE"){
                mana_ID = null;
            }
            else{
                const isIt7 = (element) => { return element == manager}
                mana_ID = (manas2.findIndex(isIt7)).toString();//do not add 1 because we unshifted "NO MANAGER"
            }
                

    
            db.query(`UPDATE _employee SET _manager_id = ? WHERE _id = ?;`,[mana_ID,emp_ID], function (err, res) {
                console.log(`Manager of ${name} updated to ${manager}.`);
                console.log(mana_ID,emp_ID);
                Prompts.prototype.init();
            });
    
        })  
         
    })
}
*/


/*

TO DO:

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.
 
!!!replace array index choice with where query, then can add deletions

*/

module.exports = Prompts;
