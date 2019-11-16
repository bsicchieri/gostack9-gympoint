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

An application created from scratch using Express and other tools:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Use PostgreSQL or MySQL).

## Functionalities

#### 1. Authentication

Allow a user to authenticate to your application using email and a password.

An admin user created using the [sequelize seeds] functionality (https://sequelize.org/master/manual/migrations.html#creating-first-seed).

#### 2. Administrator

Administrators can register student enrollment plans and make their enrollment.

Plan and enrollment can be created, viewed, edited and deleted.

When a student enrolls, they receive an email with details of their enrollment at the academy such as plan, end date, value, and a welcome message.

When a request for help is answered, the student receive an email from the platform with the academy's question and answer.

#### 3. Student

Students are kept (registered / updated) in the application using name, email, age, weight and height.

The registration of students can only be done by administrators authenticated in the application.

The student cannot authenticate to the system, ie has no password.

When the student arrives at the gym, he / she checks in only by entering his / her registration ID (the user can only do 5 checkins within 7 consecutive days).

The student can create requests for assistance to the gym regarding any exercise, food or instruction whatsoever.
