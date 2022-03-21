const inquirer = require('inquirer');
require('console.table');
const db = require('../db/db.js')


const menu=["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"];

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
        for(let i=0; i< res.length; i++)
        depts.push(res[i]._name);

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

            const isIt = (element) => element = department;

            const ID = depts.findIndex(isIt);
/////////////////////////////////////////////////AGAHAGAHAHAGHNOt working!!!
            db.query('INSERT INTO _role (_title,_salary,_department_id) VALUES ("a", "b", 5);', function (err, res) {
                console.log(`New role ${title} added to ${department} department.`);
                Prompts.prototype.init();
            });
        })
        





       //Prompts.prototype.init(); 
    })
}

Prompts.prototype.addEmployee=()=>{//enter the employee’s first name, last name, role, and manager, and that employee is added to the database


}

Prompts.prototype.addEmployeeRole=()=>{//select an employee to update and their new role and this information is updated in the database


}



//'SELECT CONCAT(_employee._last_name,", ",_employee._first_name) as Name,_role._salary as Salary FROM _employee  JOIN _role ON _employee._role_id =_role._id ORDER BY _employee._last_name;'



module.exports = Prompts;

