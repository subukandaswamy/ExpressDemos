-- CREATE EXTENSION pgcrypto;

CREATE TABLE IF NOT EXISTS users
(
	username VARCHAR(30) PRIMARY KEY,
	password TEXT NOT NULL
);

TRUNCATE TABLE users;

INSERT INTO users (username, password) VALUES (
	'subu',
	crypt('1234', gen_salt('bf'))
);

select * from users where username='subu' AND password = crypt('1234', password)