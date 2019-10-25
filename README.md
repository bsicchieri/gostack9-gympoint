<h1 align="center">
    <img alt="GoStack" src=".github/logogym.png" width="200px" />
</h1>

<h3 align="center">
 Challenge 2: Gympoint, the beginning
</h3>

<blockquote align="center">Developed during Rocketseat GoStack9 Bootcamp</blockquote>

## About
Gym manager app, the Gympoint.

## Tools
Create an application from scratch using Express, and you need to configure the following tools:

Sucrase + Nodemon;
ESLint + Prettier + EditorConfig;
Sequelize (Use PostgreSQL or MySQL).

## Functionalities
Allow a user to authenticate to your application using email and a password.

Create an admin user using sequelize's seeds functionality, this functionality is for us to create database records in an automated way.

To create a seed use the command:

yarn sequelize seed: generate --name admin-user
In the file generated in the src / database / seeds folder add the code for creating an admin user:

const bcrypt = require ("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert (
      "users",
      [
        {
          name: "Administrator",
          email: "admin@gympoint.com",
          password_hash: bcrypt.hashSync ("123456", 8),
          created_at: new Date (),
          updated_at: new Date ()
        }
      ],
      {}
    );
  },

  down: () => {}
};
Now run:

yarn sequelize db: seed: all
Now you have a user in your database, use that user for all logins from now on.

Authentication must be done using JWT.
Perform validation of input data;
2. Student Registration
Allow students to be kept (registered / updated) in the application using name, email, age, weight and height.

Use a new table in the database called students.

The registration of students can only be done by administrators authenticated in the application.

The student cannot authenticate to the system, ie has no password.
