CREATE TABLE IF NOT EXISTS users
(
  user_id SERIAL PRIMARY KEY NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  login varchar(255) UNIQUE NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  passwd varchar(255) NOT NULL,
  photo varchar(255) NOT NULL,
  info varchar(10000),
  validate BOOLEAN DEFAULT FALSE,
  unique_link varchar(255)
);
