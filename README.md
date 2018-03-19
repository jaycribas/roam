# Roam

A travel community for users to share tips about their favorite locations around the world. A user can create an account, update their profile, and leave travel trips on featured cities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Install Postgres if you haven't already
```
$ brew install postgres
```

Run script to create database.
```
$ npm run db:create
```

Run schema file.
```
$ npm run db:schema
```

Seed data to db.
```
$ npm run db:seed
```

### Installing

Clone this repo.
```
$ git clone https://github.com/jaycribas/roam
```

Install dependencies.
```
$ npm install
```

Run local server and navigate to `http://localhost:3000` in browser.
```
$ npm start
```

## Built With

* [Express](https://expressjs.com/) - Node.js web application framework
* [Postgres](https://www.postgresql.org/) - SQL relational database
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Library used to hash user passwords
* [EJS](http://ejs.co/) - views templating language to produce reusable HTML
* [Bootstrap](https://getbootstrap.com/) - Used to style pages
