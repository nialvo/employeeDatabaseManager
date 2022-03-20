INSERT INTO _department (_name)
VALUES ("Mergers & Aquisitions"),
       ("Research & Development"),
       ("Sales"),
       ("Human Resources"),
       ("Diversity Equity & Inclusion"),
       ("Janitorial"),
       ("Management");


INSERT INTO _role (_title,_salary,_department_id)
VALUES ("Quantitative Analyst",112000.25,1),
       ("Actuary",113889.75,1),
       ("Finance Intern", 36000,1),
       ("Senior Physicist",200020.00,2),
       ("Junior Physicist",80000.25,2),
       ("Voyant",1000000.00,2),
       ("Savant",1200.00,2),
       ("Salesperson",24000.00,3),
       ("Hiring Manager",24000.00,4),
       ("Firing Manager",72000.00,4),
       ("Therapist",134250.00,4),
       ("Diversity Monitor",80000.00,5),
       ("Equity Monitor",80000.00,5),
       ("Janitor", 100000.25,6),
       ("CEO",2000000.00,7),
       ("CFO",900000.00,7),
       ("COO",1200000.00,7);
       


INSERT INTO _employee (_first_name,_last_name,_role_id,_manager_id)
VALUES ("Harrison","Bergeron",15,NULL),
       ("Ahmed","Johnson",16,1),
       ("Arthur","King",17,1),
       ("Margaret","Thatcher",1,2),
       ("Martin","Amis",1,4),
       ("Christopher","Hitchens",2,4),
       ("Guy","Debord",3,6),
       ("Ace","Ventura",3,5),
       ("Claire","Holmes",4,1),
       ("Adam","Smith",5,9),
       ("Zaphod","Beeblebrox",5,9),
       ("Alan","Turing",5,9),
       ("Tom","Clancy",5,9),
       ("Jack","Ryan",6,9),
       ("Peter","Philip",7,9),
       ("Nick","John",7,9),
       ("Stephanie","Goldman",7,9),
       ("Cynthia","Ruiz",8,3),
       ("Marcus", "Aurelius",8,18),
       ("Lee", "Perry",8,18),
       ("Basil", "Kandin",9,3),
       ("Valerie", "Giscard",10,21),
       ("Manuel", "Valls",10,21),
       ("Hubert", "Humphrey",12,3),
       ("Lexington", "Bellaway",11,1),
       ("Tara", "Washington",13,24),
       ("Anthony", "Fauci",14,3),
       ("Yves", "Laurent",14,27),
       ("Ford", "Prefect",14,27);
       

       

