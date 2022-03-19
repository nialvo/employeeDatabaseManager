INSERT INTO _department (_id,_name)
VALUES (1, "Mergers & Aquisitions"),
       (2, "Research & Development"),
       (3, "Sales"),
       (4, "Human Resources"),
       (5, "Diversity Equity & Inclusion"),
       (6, "Janitorial"),
       (7, "Management");


INSERT INTO _role (_id,_title,_salary,_department_id)
VALUES (1, "Quantitative Analyst",112000.25,1),
       (2, "Actuary",113889.75,1),
       (3, "Finance Intern", 36000,1),
       (4, "Senior Physicist",200020.00,2),
       (5, "Junior Physicist",80000.25,2),
       (6, "Voyant",1000000.00,2),
       (7, "Savant",1200.00,2),
       (8, "Salesperson",24000.00,3),
       (9, "Hiring Manager",24000.00,4),
       (10, "Firing Manager",72000.00,4),
       (11, "Therapist",134250.00,4),
       (12, "Diversity Monitor",80000.00,5),
       (13, "Equity Monitor",80000.00,5),
       (14, "Janitor", 100000.25,6),
       (15, "CEO",2000000.00,7),
       (16, "CFO",900000.00,7),
       (17, "COO",1200000.00,7);
       


INSERT INTO _employee (_id,_first_name,_last_name,_role_id,_manager_id)
VALUES (1, "Harrison","Bergeron",15,NULL),
       (2, "Ahmed","Johnson",16,1),
       (3, "Arthur","King",17,1),
       (4, "Margaret","Thatcher",1,2),
       (5, "Martin","Amis",1,4),
       (6, "Christopher","Hitchens",2,4),
       (7, "Guy","Debord",3,6),
       (8, "Ace","Ventura",3,5),
       (9, "Claire","Holmes",4,1),
       (10, "Adam","Smith",5,9),
       (11, "Zaphod","Beeblebrox",5,9),
       (12,"Alan","Turing",5,9),
       (13, "Tom","Clancy",5,9),
       (14, "Jack","Ryan",6,9),
       (15, "Peter","Philip",7,9),
       (16, "Nick","John",7,9),
       (17, "Stephanie","Goldman",7,9),
       (18, "Cynthia","Ruiz",8,3),
       (19, "Marcus", "Aurelius",8,18),
       (20, "Lee", "Perry",8,18),
       (21, "Basil", "Kandin",9,3),
       (22, "Valerie", "Giscard",10,21),
       (23, "Manuel", "Valls",10,21),
       (24, "Hubert", "Humphrey",12,3),
       (25, "Lexington", "Bellaway",11,1),
       (26, "Tara", "Washington",13,24),
       (27, "Anthony", "Fauci",14,3),
       (28, "Yves", "Laurent",14,27),
       (29, "Ford", "Prefect",14,27);
       

       

