CREATE TABLE IF NOT EXISTS users
(
  user_id SERIAL PRIMARY KEY NOT NULL,
  email varchar(255) UNIQUE,
  login varchar(255) UNIQUE NOT NULL,
  first_name varchar(255),
  last_name varchar(255),
  passwd varchar(255),
  photo varchar(1000),
  info varchar(10000),
  validate BOOLEAN DEFAULT FALSE,
  unique_link varchar(255),
  googleId varchar(255),
  fortytwoId varchar(255),
  githubId varchar(255)
);
