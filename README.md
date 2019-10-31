<h1 align="center">
    <img alt="GoStack" src=".github/logogym.png" width="200px" />
</h1>

<h3 align="center">
 Gympoint
</h3>

<blockquote align="center">Developed during Rocketseat GoStack9 Bootcamp</blockquote>

## About

Gym manager app, the Gympoint.

## Tools

Create an application from scratch using Express, and you need to configure the following tools:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Use PostgreSQL or MySQL).

## Functionalities

#### 1. Authentication

Allow a user to authenticate to your application using email and a password.

Creating an admin user using the [sequelize seeds] functionality (https://sequelize.org/master/manual/migrations.html#creating-first-seed), this functionality is used to automatically create database records .

#### 2. Student Registration

Allow students to be kept (registered / updated) in the application using name, email, age, weight and height.

Use a new table in the database called `students`.

The registration of students can only be done by administrators authenticated in the application.

The student cannot authenticate to the system, ie has no password.
