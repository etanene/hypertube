CREATE TABLE IF NOT EXISTS comments
(
  id SERIAL PRIMARY KEY NOT NULL,
  text TEXT NOT NULL,
  parent_id INTEGER,
  created_at TIMESTAMP NOT NULL,
  user_id INTEGER NOT NULL,
  movie_id varchar(255) NOT NULL
);
