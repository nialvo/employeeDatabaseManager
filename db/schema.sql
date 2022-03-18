DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;


USE company_db;


CREATE TABLE _department (
   _id INT NOT NULL,
   _name VARCHAR(30) NOT NULL,
   PRIMARY KEY (_id)
);

CREATE TABLE _role (
   _id INT NOT NULL,
   _title VARCHAR(30) NOT NULL,
   _salary DECIMAL,
   _department_id INT,
   PRIMARY KEY (_id),
   FOREIGN KEY (_department_id)
   REFERENCES _department(_id)
   ON DELETE SET NULL
);

CREATE TABLE _employee (
   _id INT NOT NULL,
   _first_name VARCHAR(30) NOT NULL,
   _last_name VARCHAR(30) NOT NULL,
   _role_id INT,
   _manager_id INT,
   PRIMARY KEY (_id),
   FOREIGN KEY (_role_id)
   REFERENCES _role(_id)
   ON DELETE SET NULL,
   FOREIGN KEY (_manager_id)
   REFERENCES _employee(_id)
   ON DELETE SET NULL,
);

