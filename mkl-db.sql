-- from terminal run:
-- psql < mkl-db.sql

DROP DATABASE IF EXISTS mkl-db;

CREATE DATABASE mkl-db;

\c mkl-db

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,  
    username TEXT NOT NULL,
    password TEXT NOT NULL, 
    email TEXT
);

CREATE TABLE eaters
(
    id SERIAL PRIMARY KEY,
    diet TEXT NOT NULL,
    allergies TEXT,
    preferences TEXT,
    aversions TEXT,
    lunches TEXT,
    user_id INTEGER REFERENCES users
);

CREATE TABLE foods
(
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    nutrition TEXT,
    user_id INTEGER REFERENCES users,
    eater_id INTEGER REFERENCES eaters
);

CREATE TABLE lunches
(
    id SERIAL PRIMARY KEY,      
    protein TEXT,
    carbohydrate TEXT,
    fruit TEXT,
    vegetable TEXT,
    fat TEXT,
    sweet TEXT,
    eater_id INTEGER REFERENCES eaters,
    user_id INTEGER REFERENCES users,
    food_id INTEGER REFERENCES foods
);

CREATE TABLE favorites
(
    id SERIAL PRIMARY KEY,  
    user_id INTEGER REFERENCES users,
    eater_id INTEGER REFERENCES eaters,
    lunches_id INTEGER REFERENCES lunches
);

CREATE TABLE reviews
(
    id SERIAL PRIMARY KEY,  
    user_id INTEGER REFERENCES users,
    eater_id INTEGER REFERENCES eaters,
    lunches_id INTEGER REFERENCES lunches
);





