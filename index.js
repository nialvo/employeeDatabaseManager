const mysql = require('mysql2');
require('dotenv').config();
require('console.table');
require('inquirer');

const pw = process.env.DB_PASSWORD;
const userID = process.env.DB_USER;
const dbn = process.env.DB_NAME;


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: userID,
      password: pw,
      database: dbn
    },
    console.log(`Connected to the ${dbn} database.`)
);
/*
db.query('SELECT CONCAT(_first_name," ",_last_name) as Name FROM _employee JOIN _role ON _employee._role_id =_role._id;', function (err, res) {
    console.table(res);
});
*/
function salary(){
  db.query('SELECT CONCAT(_employee._last_name,", ",_employee._first_name) as Name,_role._salary as Salary FROM _employee  JOIN _role ON _employee._role_id =_role._id;', function (err, res) {
    console.table(res);
  });
}

salary();


//const inquirer = require('inquirer');
//function Prompts() {};
const yesnomaybe = ["Salary", "Intern", "Finish"];

Prompts.prototype.Manager = () => {
    return inquirer.prompt([{

            type: 'input',
            name: 'name',
            message: 'Enter manager name.',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID number.',
            validate: (answer) => {
                const pass = answer.match(/^[0-9]\d*$/);
                if (pass) {
                  return true;
                }
                return 'Please enter a positive number.';
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email.',
            validate: (answer) => {
                const pass = answer.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
                if (pass) {
                  return true;
                }
                return 'Please enter a valid email address.';
            },
        },
        {
            type: 'input',
            name: 'office',
            message: 'Enter employee office number.',
            validate: (answer) => {
                const pass = answer.match(/^[0-9]\d*$/);
                if (pass) {
                  return true;
                }
                return 'Please enter a positive number.';
            },
        },
        {
            type: "checkbox",
            name: "addMore",
            message: "Would you like to add an engineer or an intern to your team?",
            choices: yesnomaybe,
        }
    ]);
};
/*
SELECT
  favorite_books.book_name AS name, book_prices.price AS price
FROM favorite_books
JOIN book_prices ON favorite_books.book_price = book_prices.id;



USE books_db;

CREATE TABLE book_prices (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  price INT NOT NULL,
  brice INT NOT NULL
);

CREATE TABLE favorite_books (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  book_name VARCHAR(30) NOT NULL,
  in_stock BOOLEAN,
  book_price INT,
  FOREIGN KEY (book_price)
  REFERENCES book_prices(id)
  ON DELETE SET NULL
);

*/