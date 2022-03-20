
const Prompts = require('./src/prompts.js')
const prompts = new Prompts();


prompts.init();



/*
menu:
  view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  all departments: department names and department ids
  all roles: job title, role id, the department that role belongs to, and the salary for that role
  all employees: employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  add a department: prompted to enter the name of the department and that department is added to the database
  add a role: prompted to enter the name, salary, and department for the role and that role is added to the database
  add an employee: prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  update an employee role: prompted to select an employee to update and their new role and this information is updated in the database 

  BONUSES:
 Update employee managers.

* View employees by manager.

* View employees by department.

* Delete departments, roles, and employees.

* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.


*/