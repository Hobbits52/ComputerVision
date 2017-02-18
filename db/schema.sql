CREATE DATABASE visiontest;

USE visiontest;

CREATE TABLE Students (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(40) NOT NULL,
  password varchar(40) NOT NULL,
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/