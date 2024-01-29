-- Your SQL goes here
CREATE TABLE posts (
  id          VARCHAR(256) primary key,
  title       VARCHAR(256),
  body        TEXT,
  created     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
