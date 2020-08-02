INSERT INTO
  users (login, email, first_name, last_name, validate, photo, passwd)
VALUES
  ('root', 'kratyuk@mail.ru', 'root', 'root', TRUE, 'avatar.jpg', '$2b$04$tQciV8PEeCfqEZdEMtN4kO8LPDPx3WOAIIMVC2qtkIN6SZ/fxFokG')
ON CONFLICT (login)
  DO NOTHING;
