require('console.table');
const db = require('../db/db.js')



function Queries(){}

Queries.prototype.salaries=()=>{
    db.query('SELECT CONCAT(_employee._last_name,", ",_employee._first_name) as Name,_role._salary as Salary FROM _employee  JOIN _role ON _employee._role_id =_role._id ORDER BY _employee._last_name;', function (err, res) {
      console.table(res);
    });
}

Queries.prototype.departments=()=>{
    db.query('SELECT _name as Department, _id as ID  FROM _department;', function (err, res) {
        console.table(res);
      });
    
}
/*
Queries.prototype.roles=()=>{

}

Queries.prototype.employees=()=>{

}
*/

module.exports = Queries;

/*all departments: department names and department ids
  all roles: job title, role id, the department that role belongs to, and the salary for that role
  all employees: employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  */