DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial PRIMARY KEY,
  email varchar(80) UNIQUE NOT NULL,
  password varchar(120) NOT NULL,
  city varchar(50),
  joined_on date,
  img_url text
);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities (
  id serial PRIMARY KEY,
  name varchar(60),
  img_url text
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id serial,
  user_id INT REFERENCES users,
  city_id INT REFERENCES cities,
  title varchar(120) NOT NULL,
  body text NOT NULL,
  posted_on date
);
