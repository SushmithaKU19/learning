USE bookdb;

INSERT INTO books (title, author, isbn, published_year)
VALUES
  ('Clean Code', 'Robert C. Martin', '9780132350884', 2008),
  ('Effective Java', 'Joshua Bloch', '9780134685991', 2018),
  ('Spring in Action', 'Craig Walls', '9781617294945', 2018),
  ('The Pragmatic Programmer', 'Andrew Hunt', '9780135957059', 2019)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  author = VALUES(author),
  published_year = VALUES(published_year);
