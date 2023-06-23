CREATE TABLE users(
    id SERIAL PRIMARY KEY,  
    username VARCHAR(25) UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1),
    diet TEXT,
    allergies TEXT,
    preferences TEXT,
    aversions TEXT
);

CREATE TABLE foods (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    serving_size TEXT,
    calories FLOAT,
    fat FLOAT,
    protein FLOAT,
    carbohydrates FLOAT,
    sugar FLOAT
);

CREATE TABLE lunches (
    id SERIAL PRIMARY KEY, 
    title TEXT,     
    protein TEXT,
    carbohydrate TEXT,
    fruit TEXT,
    vegetable TEXT,
    fat TEXT,
    sweet TEXT,
    beverage TEXT,
    user_id INTEGER 
        REFERENCES users,
    food_id INTEGER 
        REFERENCES foods
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,  
    user_id INTEGER 
        REFERENCES users ON DELETE CASCADE,
    lunches_id INTEGER 
        REFERENCES lunches ON DELETE CASCADE
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,  
    user_id INTEGER 
        REFERENCES users,
    lunches_id INTEGER 
        REFERENCES lunches
);
