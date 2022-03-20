# employeeDatabaseManager

to run the program:<br>

-remove xxx from .env filename<br>
-add mysql password to .env file<br>
-in mysql run db/schema.sql then db/seed.sql<br>
-npm start<br>

Important!:<br>
for now only "view all departments" is a valid selection<br>
The problem is line 34 in src/prompts<br>

I would like to use this  kind of logic (prompts inside prompts), but it messes up the display<br>
I tried many ways, and it always gives the second prompt before displaying the table, and displaces the table headers, like in the picture below:<br>

<img src="./images/Capture.PNG" alt="capture"><br><br>
when it should instead look like this:<br>
<img src="./images/Capture2.PNG" alt="capture 2"><br>