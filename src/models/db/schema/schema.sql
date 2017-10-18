DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial,
  email varchar(80) UNIQUE NOT NULL,
  password varchar(120) NOT NULL
);
