drop table if exists users;
CREATE TABLE users (
  email TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  firstname TEXT NOT NULL,
  familyname TEXT NOT NULL,
  username TEXT NOT NULL
 
);

drop table if exists signedInUsers;
CREATE TABLE signedInUsers (
  email TEXT,
  token TEXT NOT NULL PRIMARY KEY


);

