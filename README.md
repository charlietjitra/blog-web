
# Blog Web

This is a blog web application built with Node.js, Express, EJS, and PostgreSQL. The application allows users to create, edit, delete, and view blog posts. It includes user authentication to ensure that only registered users can create posts. The application follows the MVC (Model-View-Controller) pattern and uses PostgreSQL for data persistence.


## Features

- CRUD operation for blog posts
- Content filtering unwanted text
- User authentication (registration, login, and logout)



## Installation

1. Clone the repository

```bash
git clone https://github.com/charlietjitra/blog-web.git
```
2. Navigate to project directory:

```bash
cd blog-web
```

3. Install dependencies
```bash
npm i
```
4. Create a .env file based on .env.example and add your database credentials and other environment variables.    

5. Set up the PostgreSQL database
 - Create a PostgreSQL database and configure it in models/db.js.
 ```sql
 CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date date,
    user_id INT,
    author VARCHAR(100) NOT NULL,
    CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users(id)
);
```
Use the query to create the table

6. Run the application
```bash
    node app.js
```
This application will be running at 'http://localhost:3000'.
## Tech Stack

**Backend:** Node.js, Express

**Frontend:** EJS, CSS

**Database:** PostgreSQL

**Authentication:** Passport.js


