INSERT INTO
  users (login, email, first_name, last_name, passwd, photo, validate)
VALUES
  ('root', 'root', 'root', 'root', '$2b$04$tQciV8PEeCfqEZdEMtN4kO8LPDPx3WOAIIMVC2qtkIN6SZ/fxFokG', 'avatar.jpg', TRUE)
ON CONFLICT ON CONSTRAINT users_email_key
  DO NOTHING;
